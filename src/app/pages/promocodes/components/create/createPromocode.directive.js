(function () {
  'use strict';

  angular
    .module('pizzaFrontend')
    .directive('createPromocode', createPromocode);

  /** @ngInject */
  function createPromocode() {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/pages/promocodes/components/create/createPromocode.html',
      controller: createPromocodeController,
      controllerAs: 'createPromocode'
    };

    return directive;
  }

  /** @ngInject */
  function createPromocodeController() {
    var vm = this;
    vm.save = save;
    vm.generate = generate;
    ////////////

    activate();

    function activate() {

    }

    function save(){
      console.log('test');
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

    function generate(){
      console.log('asd');
      vm.code = Math.random().toString(16).slice(2);
    }

  }
})();
