'use strict';

var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var updateNotifier = require('update-notifier');

var utils = require('../utils');

var Generator = module.exports = yeoman.generators.NamedBase.extend({
  constructor: function () {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.utils = utils;
    this.pkg = utils.getPackage(this.config);
    this.srcDir = utils.getAppDir(this.config);
    this.appPath = this.destinationPath(this.config.get('dirs').app);
  }
});

Generator.prototype.logOption = function logOption (key, value) {
  this.log(chalk.yellow('  ' + key + ': ') + value);
};

Generator.prototype.checkForUpdates = function checkForUpdates () {
  var notifier = updateNotifier({
    packageName: this.pkg.name,
    packageVersion: this.pkg.version
  });
  notifier.notify();
};

Generator.prototype.moduleDir = function moduleDir (module) {
  var app = this.config.get('paths').app || 'app';
  var parts = module.split('.');

  if (parts[0] !== app) {
    // not a top-level app module, so let's add the app path back in
    parts.unshift(app);
  }

  return _.reduce(parts, function (agg, p) {
    return path.join(agg, p);
  }, '');
};

Generator.prototype.modulePath = function modulePath (filename) {
  var moduleName = this.module || 'blocks';
  var moduleDir = this.moduleDir(moduleName);
  var dest = this.destinationPath(this.srcDir + '/' + moduleDir);
  if (filename) {
    dest = path.join(dest, filename);
  }
  return dest;
};

Generator.prototype.createFromTemplate = function createFromTemplate (opt) {
  // strip the angular types from the name since they're
  // getting added as 'type' and that's redundant
  var name = this.name || utils.stripNamespace(this.module);
  name = utils.hyphenName(utils.stripAngularTypes(name));

  var options = opt(name);

  this.fs.copyTpl(
    this.templatePath(options.tmpl),
    this.modulePath(options.dest),
    this
  );
};

/**
 * createCodeFile - description
 *
 * @param  {type} type service, module, controller, etc.
 * @param  {type} ext  js, es6, html, etc.
 */
Generator.prototype.createCodeFile = function createCodeFile (type, ext) {
  this.createFromTemplate(function (name) {
    return {
      tmpl: type + '.' + ext,
      dest: name + '.' + type + '.' + ext
    }
  });
};

/**
 * createCodeFile - description
 *
 * @param  {type} type service, module, controller, etc.
 * @param  {type} ext  js, es6, html, etc.
 */
Generator.prototype.createUnitTest = function createCodeFile (type, ext) {
  this.createFromTemplate(function (name) {
    return {
      tmpl: type + '.spec.' + ext,
      dest: name + '.' + type + '.spec.' + ext
    }
  });
};

require('./prompts.js')(Generator);
