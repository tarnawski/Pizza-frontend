(function() {
  'use strict';

  angular
    .module('pizzaFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock(CONSTANTS, $rootScope, $state, authService, store, toaster){

    $rootScope.$on('user:LoggedIn', onUserLoggedIn);
    $rootScope.$on('user:LoggedOut', onUserLoggedOut);
    $rootScope.$on('user:RefreshedToken', onUserRefreshedToken);
    $rootScope.$on('$stateChangeStart', onStateChangeStart);

    function onUserLoggedIn() {
      $state.go('dashboard.main');
    }

    function onUserLoggedOut() {
      $state.go('login');
    }

    function onUserRefreshedToken() {
      $state.go('dashboard.main', { message: 'Your session has been refreshed' });
    }

    function onStateChangeStart(event, toState, toParams, fromState, fromParams) {

      var isUserAllowed = authService.isUserAllowed(toState);

      if(!isUserAllowed){
        event.preventDefault();
        $state.go('login');
      }
    }
    
  }
})();
