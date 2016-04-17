(function () {
  'use strict';

  angular
    .module('pizzaFrontend.prices')
    .controller('PricesController', PricesController);

  /** @ngInject */
  function PricesController(communicationFactory, $stateParams, $state, $timeout) {

    var vm = this;
    vm.remove = remove;
    vm.pushMessage = pushMessage;

    activate();

    ////////////////////////////////

    function activate() {
      vm.idType = $stateParams.type_id;
      vm.idProduct = $stateParams.product_id;
      if($stateParams.message) {
        pushMessage($stateParams.message, 5000);
      }
      getData($stateParams.type_id, $stateParams.product_id);
    }

    function getData(idType, idProduct){
      communicationFactory.prices.query({type_id: idType, product_id: idProduct},
        function (data) {
          vm.prices = data;
      },
        function () {
          $state.go('prices', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function pushMessage(message, time){
      vm.count = true;
      vm.info = message;
      $timeout(function () { vm.count = false; }, time);
    }

    function remove(id){
      communicationFactory.prices.delete({type_id: $stateParams.type_id, product_id: $stateParams.product_id, price_id: id},
        function (data) {
          $state.go($state.current, {message: 'Cena została usunięta.'}, {reload: true});
      },
        function () {
          $state.go('prices', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
