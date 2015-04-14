(function() {
    'use strict';

    var gulp = require('gulp'),
        build = require('../util/build'),
        utilities = require('../util/utilities'),
        htmlBuilder = require('../util/builder.html'),
        appScriptBuilder = require('../util/builder.script.app'),
        vendorScriptBuilder = require('../util/builder.script.vendor'),
        sassBuilder = require('../util/builder.sass');

    // TASK RUNNERS
    gulp.task('default', ['watch']);

    gulp.task('js', ['app.js','vendor.js']);
    gulp.task('js:dist', ['app.js:dist','vendor.js:dist']);

    gulp.task('watch', ['serve'],           function() { return utilities.watch(''); });
    gulp.task('watch:dist', ['serve:dist'], function() { return utilities.watch(':dist'); });
    gulp.task('watch:docs', ['serve:docs'] );

    // PROJECT BUILDERS
    gulp.task('build',          function(cb) { return build.build(false, cb); });
    gulp.task('build:dist',     function(cb) { return build.build(true, cb); });

    // SCRIPT BUILDERS
    gulp.task('app.js',         function() { return appScriptBuilder.app(false); });
    gulp.task('app.js:dist',    function() { return appScriptBuilder.app(true); });
    gulp.task('vendor.js',      function() { return vendorScriptBuilder.vendor(false); });
    gulp.task('vendor.js:dist', function() { return vendorScriptBuilder.vendor(true); });

    // STYLES BUILDERS
    gulp.task('sass',           function() { return sassBuilder.sass(false); });
    gulp.task('sass:dist',      function() { return sassBuilder.sass(true); });

    // VIEW BUILDERS
    gulp.task('fonts',          function() { return htmlBuilder.fonts(false); });
    gulp.task('fonts:dist',     function() { return htmlBuilder.fonts(true); });
    gulp.task('html',           function() { return htmlBuilder.html(false); });
    gulp.task('html:dist',      function() { return htmlBuilder.html(true); });
    gulp.task('images',         function() { return htmlBuilder.images(false); });
    gulp.task('images:dist',    function() { return htmlBuilder.images(true); });
    gulp.task('templates',      function() { return htmlBuilder.templates(false); });
    gulp.task('templates:dist', function() { return htmlBuilder.templates(true); });

    // UTILITIES
    gulp.task('clean',          function() { return utilities.clean(false); });
    gulp.task('clean:dist',     function() { return utilities.clean(true); });

    gulp.task('gendocs',        function() { return utilities.gendocs(); });

})();
