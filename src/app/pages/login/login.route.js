(function ()
{
    'use strict';

    angular
        .module('pizzaFrontend.login')
        .config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider) {
$stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'app/pages/login/login.html',
    controller: 'LoginController',
    controllerAs: 'login',
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
