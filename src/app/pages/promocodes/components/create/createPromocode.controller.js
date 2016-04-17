(function () {
  'use strict';

  angular
    .module('pizzaFrontend.promocodes')
    .controller('createPromocodeController', createPromocodeController);

  /** @ngInject */
  function createPromocodeController(communicationFactory, $state) {

    var vm = this;
    vm.save = save;
    vm.generate = generate;


    ////////////////////////////////


    function generate(){
      vm.code = Math.random().toString(16).slice(2);
    }

    function save(){
      if (vm.type == 'percent'){
        var isPercent = true;
      }

      var data = {
        name: vm.name,
        percent: isPercent,
        overall: !isPercent,
        value: vm.value,
        code: vm.code,
        available: vm.available
      };

      communicationFactory.promocodes.save(data,
        function () {
          $state.go('promocodes', { message: 'Kod promocyjny został pomyślniedodany' });
      },
        function () {
          $state.go('promocodes', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
