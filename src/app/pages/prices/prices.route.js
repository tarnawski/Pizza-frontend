(function () {
  'use strict';

  angular
    .module('pizzaFrontend.prices')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('prices', {
        url: '/type/:type_id/product/:product_id/prices',
        templateUrl: 'app/pages/prices/prices.html',
        controller: 'PricesController',
        controllerAs: 'prices',
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
      .state('create_price', {
        url: '/types/:type_id/product/:product_id/price',
        templateUrl: 'app/pages/prices/components/create/createPrice.html',
        controller: 'createPriceController',
        controllerAs: 'createPrice',
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
      .state('update_price', {
        url: '/types/:type_id/product/:product_id/prices/:price_id',
        templateUrl: 'app/pages/prices/components/update/updatePrice.html',
        controller: 'updatePriceController',
        controllerAs: 'updatePrice',
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
