(function () {
  'use strict';

  angular
    .module('pizzaFrontend.profile')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/pages/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
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
