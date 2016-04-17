(function () {
  'use strict';

  angular
    .module('pizzaFrontend.products')
    .controller('ProductsController', ProductsController);

  /** @ngInject */
  function ProductsController(communicationFactory, $stateParams, $state, $timeout) {

    var vm = this;
    vm.remove = remove;
    vm.pushMessage = pushMessage;

    activate();

    ////////////////////////////////

    function activate() {
      vm.idType = $stateParams.type_id;
      if($stateParams.message) {
        pushMessage($stateParams.message, 5000);
      }
      getData($stateParams.type_id);
    }

    function getData(idType){
      communicationFactory.products.query({type_id: idType},
        function (data) {
          vm.products = data;
      },
        function () {
          $state.go('products', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function pushMessage(message, time){
      vm.count = true;
      vm.info = message;
      $timeout(function () { vm.count = false; }, time);
    }

    function remove(id){
      communicationFactory.products.delete({type_id: $stateParams.type_id, product_id: id},
        function (data) {
          $state.go($state.current, {message: 'Produkt został usunięty.'}, {reload: true});
        },
        function () {
          $state.go('products', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
