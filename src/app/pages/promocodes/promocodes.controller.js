(function () {
  'use strict';

  angular
    .module('pizzaFrontend.promocodes')
    .controller('PromocodesController', PromocodesController);

  /** @ngInject */
  function PromocodesController(communicationFactory, $timeout) {

    var vm = this;
    vm.status = '';
    vm.save = save;
    vm.edit = edit;
    vm.update = update;
    vm.remove = remove;
    vm.generate = generate;
    vm.changeStatus = changeStatus;
    vm.pushMessage = pushMessage;

    activate();

    ////////////////////////////////

    function activate() {
      vm.status = 'list';
      getData();
    }

    function getData(){
      communicationFactory.promocodes.query(
        function (data) {
          vm.promocodes = data;
      },
        function () {
          pushMessage('Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.', 5000);
        }
      );
    }

    function generate(){
      vm.code = Math.random().toString(16).slice(2);
    }

    function changeStatus(status){
      vm.status = status;
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
        function (data) {
          getData();
          changeStatus('list');
          pushMessage('Nowy kod promocyjny został poprawnie utworzony.', 3000);
      },
        function () {
          pushMessage('Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.', 5000);
        }
      );
    }

    function edit(promocode){
      vm.id = promocode.id;
      vm.name = promocode.new_name;
      if(promocode.new_percent){
        vm.type = 'percent';
      } else if(promocode.new_overall) {
        vm.type = 'overall';
      }
      vm.value = promocode.new_value;
      vm.code = promocode.new_code;
      vm.available = promocode.new_available;
      changeStatus('update');
    }

    function update(){

      if (vm.new_type == 'percent'){
        var isPercent = true;
      }

      var data = {
        name: vm.new_name,
        percent: isPercent,
        overall: !isPercent,
        value: vm.new_value,
        code: vm.new_code,
        available: vm.new_available
      };

      communicationFactory.promocodes.update({id: vm.id}, data,
        function (data) {
          getData();
          changeStatus('list');
          pushMessage('Nowy kod promocyjny został poprawnie aktualizowany.', 3000);
      },
        function () {
          pushMessage('Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.', 5000);
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
          getData();
          changeStatus('list');
          pushMessage('Kod promocyjny został usunięty.', 3000);
      },
        function () {
          pushMessage('Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.', 5000);
        }
      );
    }
  }
})();
