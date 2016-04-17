(function () {
  'use strict';

  angular
    .module('pizzaFrontend.products')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('products', {
        url: '/type/:type_id/products',
        templateUrl: 'app/pages/products/products.html',
        controller: 'ProductsController',
        controllerAs: 'products',
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
      .state('create_product', {
        url: '/types/:type_id/products/create',
        templateUrl: 'app/pages/products/components/create/createProduct.html',
        controller: 'createProductController',
        controllerAs: 'createProduct',
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
      .state('update_product', {
        url: '/types/:type_id/products/:product_id',
        templateUrl: 'app/pages/products/components/update/updateProduct.html',
        controller: 'updateProductController',
        controllerAs: 'updateProduct',
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
