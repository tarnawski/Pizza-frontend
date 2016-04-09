(function () {
  'use strict';

  angular
    .module('pizzaFrontend.promocodes')
    .controller('updatePromocodeController', updatePromocodeController);

  /** @ngInject */
  function updatePromocodeController(communicationFactory, $stateParams, $state) {

    var vm = this;
    var idPromocode;
    vm.generate = generate;
    vm.update = update;

    activate();

    ////////////////////////////////

    function activate(){
      idPromocode = $stateParams.id;
      getData(idPromocode);
    }

    function getData(id){
      communicationFactory.promocodes.get({id: id },
        function (data) {
          vm.promocode = data;
          if(data.percent){
            vm.promocode.type = 'percent';
          } else if(data.overall) {
            vm.promocode.type = 'overall';
          }
        },
        function () {
          $state.go('promocodes', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function generate(){
      vm.promocode.code = Math.random().toString(16).slice(2);
    }

    function update(){
      if (vm.promocode.type == 'percent'){
        var isPercent = true;
      }

      var data = {
        name: vm.promocode.name,
        percent: isPercent,
        overall: !isPercent,
        value: vm.promocode.value,
        code: vm.promocode.code,
        available: vm.promocode.available
      };

      communicationFactory.promocodes.update({id: idPromocode}, data,
        function () {
          $state.go('promocodes', { message: 'Kod promocyjny został pomyślnie aktualizowany' });
      },
        function () {
          $state.go('promocodes', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
