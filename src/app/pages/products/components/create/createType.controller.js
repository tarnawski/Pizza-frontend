(function () {
  'use strict';

  angular
    .module('pizzaFrontend.types')
    .controller('createTypeController', createTypeController);

  /** @ngInject */
  function createTypeController(communicationFactory, $state) {

    var vm = this;
    vm.save = save;

    ////////////////////////////////

    function save(){

      var data = {
        name: vm.name
      };

      communicationFactory.types.save(data,
        function () {
          $state.go('types', { message: 'Kategoria została pomyślnie dodana' });
      },
        function () {
          $state.go('types', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
