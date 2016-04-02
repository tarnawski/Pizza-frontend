(function () {
  'use strict';

  angular
    .module('pizzaFrontend.customers')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('customers', {
        url: '/customers',
        templateUrl: 'app/pages/customers/customers.html',
        controller: 'CustomersController',
        controllerAs: 'customers',
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
          requireAuth: true
        }
      });
  }

})();
