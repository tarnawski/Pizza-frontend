(function () {
  'use strict';

  angular
    .module('pizzaFrontend.prices')
    .controller('updatePriceController', updatePriceController);

  /** @ngInject */
  function updatePriceController(communicationFactory, $stateParams, $state) {

    var vm = this;
    vm.update = update;

    activate();

    ////////////////////////////////

    function activate(){
      vm.idType = $stateParams.type_id;
      vm.idProduct = $stateParams.product_id;
      vm.idPrice = $stateParams.price_id;
      getData($stateParams.type_id, $stateParams.product_id, $stateParams.price_id);
    }

    function getData(idType, idProduct, idPrice){
      communicationFactory.prices.get({
        type_id: idType,
        product_id: idProduct,
        price_id : idPrice
      },
        function (data) {
          vm.price = data;
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

    function update(){
      var data = {
        type: vm.price.type,
        value: vm.price.value
      };

      communicationFactory.prices.update({
        type_id: $stateParams.type_id,
        product_id: $stateParams.product_id,
        price_id: $stateParams.price_id
      }, data,
        function () {
          $state.go('prices', {
            type_id: $stateParams.type_id,
            product_id: $stateParams.product_id,
            message: 'Cena została pomyślnie aktualizowana' });
        },
        function () {
          $state.go('prices', {
            type_id: $stateParams.type_id,
            product_id: $stateParams.product_id,
            message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
