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
      })
      .state('create_promocode', {
        url: '/promocode/create',
        templateUrl: 'app/pages/promocodes/components/create/createPromocode.html',
        controller: 'createPromocodeController',
        controllerAs: 'createPromocode',
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
      })
      .state('update_promocode', {
        url: '/promocode/:id',
        templateUrl: 'app/pages/promocodes/components/update/updatePromocode.html',
        controller: 'updatePromocodeController',
        controllerAs: 'updatePromocode',
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
      })
    ;
  }

})();
