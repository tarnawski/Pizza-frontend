(function () {
  'use strict';

  angular
    .module('pizzaFrontend.types')
    .controller('TypesController', TypesController);

  /** @ngInject */
  function TypesController(communicationFactory, $stateParams, $state, $timeout) {

    var vm = this;
    vm.remove = remove;
    vm.pushMessage = pushMessage;

    activate();

    ////////////////////////////////

    function activate() {
      if($stateParams.message) {
        pushMessage($stateParams.message, 5000);
      }
      getData();
    }

    function getData(){
      communicationFactory.types.query(
        function (data) {
          vm.types = data;
      },
        function () {
          $state.go('types', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function pushMessage(message, time){
      vm.count = true;
      vm.info = message;
      $timeout(function () { vm.count = false; }, time);
    }

    function remove(id){
      communicationFactory.types.delete({id: id},
        function (data) {
          $state.go($state.current, {message: 'Kategoria została usunięta.'}, {reload: true});
        },
        function () {
          $state.go('types', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
