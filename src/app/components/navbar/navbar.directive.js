(function() {
  'use strict';

  angular
    .module('pizzaFrontend')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar($state, authService, store) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: navbarController,
      controllerAs: 'navbar',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function navbarController() {

      var vm = this;

      vm.logout = logoutUser;

      activate();

      ////////////

      function activate() {
        vm.currentUser  = store.get('currentUser');
      }

      function logoutUser() {
        authService.logout();
        $state.go('login', {message: 'Zostałeś popranie wylogowany'});

      }
    }
  }

})();
