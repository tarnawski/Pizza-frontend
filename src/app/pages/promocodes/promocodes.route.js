(function () {
  'use strict';

  angular
    .module('pizzaFrontend.promocodes')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('promocodes', {
        url: '/promocodes',
        templateUrl: 'app/pages/promocodes/promocodes.html',
        controller: 'PromocodesController',
        controllerAs: 'promocodes',
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
