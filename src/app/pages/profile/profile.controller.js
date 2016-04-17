(function () {
  'use strict';

  angular
    .module('pizzaFrontend.profile')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController(communicationFactory, store) {

    var vm = this;

    activate();

    function activate() {
      vm.currentUser  = store.get('currentUser');
      communicationFactory.application.get(function (data) {
        vm.application = data;
      })
    }
  }
})();
