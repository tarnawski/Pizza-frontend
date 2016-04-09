(function () {
  'use strict';

  angular
    .module('pizzaFrontend.types')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('types', {
        url: '/types',
        templateUrl: 'app/pages/types/types.html',
        controller: 'TypesController',
        controllerAs: 'types',
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
      .state('create_type', {
        url: '/type/create',
        templateUrl: 'app/pages/types/components/create/createType.html',
        controller: 'createTypeController',
        controllerAs: 'createType',
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
      .state('update_type', {
        url: '/type/:id',
        templateUrl: 'app/pages/types/components/update/updateType.html',
        controller: 'updateTypeController',
        controllerAs: 'updateType',
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
