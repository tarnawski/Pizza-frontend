(function() {
  'use strict';

  angular
    .module('pizzaFrontend.login')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(authService, CONSTANTS, $stateParams) {

    var vm = this;
    vm.signIn = signIn;
    vm.validateInputs = validateInputs;

    activate();

    ////////////////

    function activate() {
      if($stateParams.message) {
        vm.successResponse = $stateParams.message;
      }
    }

    function signIn() {
      return authService.login(CONSTANTS.OAUTH.PROVIDERS.DEFAULT, vm.user)
        .catch(setErrorMessage);
    }

    function setErrorMessage(error) {
      vm.successResponse = "";
      vm.errorResponse = error;
    }

    function validateInputs() {
      return angular.isDefined(vm.user) &&
        angular.isString(vm.user.username) &&
        angular.isString(vm.user.password);
    }

  }
})();
