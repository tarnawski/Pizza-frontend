(function() {
  'use strict';

  angular
    .module('pizzaFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($urlRouterProvider) {
    // Default behaviour
    $urlRouterProvider.otherwise('/');
  }

})();
