(function () {
  'use strict';

  angular
    .module('pizzaFrontend.types')
    .controller('updateTypeController', updateTypeController);

  /** @ngInject */
  function updateTypeController(communicationFactory, $stateParams, $state) {

    var vm = this;
    var idType;
    vm.update = update;

    activate();

    ////////////////////////////////

    function activate(){
      idType = $stateParams.id;
      getData(idType);
    }

    function getData(id){
      communicationFactory.types.get({id: id },
        function (data) {
          vm.type = data;
        },
        function () {
          $state.go('types', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function update(){
      var data = {
        name: vm.type.name
      };

      communicationFactory.types.update({id: idType}, data,
        function () {
          $state.go('types', { message: 'Kategoria została pomyślnie aktualizowana' });
        },
        function () {
          $state.go('types', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
