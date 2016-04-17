(function () {
  'use strict';

  angular
    .module('pizzaFrontend.promocodes')
    .controller('PromocodesController', PromocodesController);

  /** @ngInject */
  function PromocodesController(communicationFactory, $stateParams, $state, $timeout) {

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
      communicationFactory.promocodes.query(
        function (data) {

          // if(data.percent){
          //   var type = 'Procentowy';
          // } else if(data.overall) {
          //   var type = 'Całościowy';
          // }
          // if(data.available){
          //   var available = 'Dostępny';
          // } else if(data.overall) {
          //   var available = 'Nie dostępny';
          // }
          // if(data.percent){
          //   var value = data.value + '%';
          // } else if(data.overall) {
          //   var value = data.value + 'zł';
          // }
          //
          // vm.promocodes = {
          //   name: data.name,
          //   type: type,
          //   available: available,
          //   code: data.code,
          //   value: value
          // };
          vm.promocodes = data;
      },
        function () {
          $state.go('promocodes', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function pushMessage(message, time){
      vm.count = true;
      vm.info = message;
      $timeout(function () { vm.count = false; }, time);
    }

    function remove(id){
      communicationFactory.promocodes.delete({id: id},
        function (data) {
          $state.go($state.current, {message: 'Kod promocyjny został usunięty.'}, {reload: true});
        },
        function () {
          $state.go('promocodes', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
