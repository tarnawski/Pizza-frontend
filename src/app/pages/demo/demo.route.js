(function () {
  'use strict';

  angular
    .module('pizzaFrontend.demo')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('demo', {
        url: '/demo',
        templateUrl: 'app/pages/demo/demo.html',
        controller: 'DemoController',
        controllerAs: 'demo',
        params: {
          message: null
        },
        resolve: {
          message: /* @ngInject */
            function ($stateParams) {
              return $stateParams.message;
            }
        },
        data: {
          requireAuth: false
        }
      });
  }

})();
