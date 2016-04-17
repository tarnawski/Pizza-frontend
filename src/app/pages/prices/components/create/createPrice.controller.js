(function () {
  'use strict';

  angular
    .module('pizzaFrontend.prices')
    .controller('createPriceController', createPriceController);

  /** @ngInject */
  function createPriceController(communicationFactory, $state, $stateParams) {

    var vm = this;
    vm.save = save;

    activate();

    ////////////////////////////////

    function activate() {
      vm.idType = $stateParams.type_id;
      vm.idProduct = $stateParams.product_id;
    }

    function save(){

      var data = vm.price;

      communicationFactory.prices.save({type_id: $stateParams.type_id, product_id: $stateParams.product_id}, data,
        function () {
          $state.go('prices', {
            type_id: $stateParams.type_id,
            product_id: $stateParams.product_id,
            message: 'Cena została pomyślnie dodana'
          });
      },
        function () {
          $state.go('prices', {
            type_id: $stateParams.type_id,
            product_id: $stateParams.product_id,
            message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.'
          });
        }
      );
    }
  }
})();
