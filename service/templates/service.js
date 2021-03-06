(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name <%= utils.lowerName(module) %>.factory:<%= utils.upperName(name) %>
   *
   * @description
   *
   */
  angular
    .module('<%= utils.lowerName(module) %>')
    .service('<%= utils.upperName(name) %>', <%= utils.upperName(name) %>);

  /* @ngInject */
  function <%= utils.upperName(name) %> () {
    var self = this;

    self.get = function () {
      return '<%= utils.upperName(name) %>';
    };
  }
}());
