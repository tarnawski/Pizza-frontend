(function () {
  'use strict';

  angular
    .module('pizzaFrontend.products')
    .controller('updateProductController', updateProductController);

  /** @ngInject */
  function updateProductController(communicationFactory, $stateParams, $state) {

    var vm = this;
    var idProduct;
    vm.update = update;

    activate();

    ////////////////////////////////

    function activate(){
      vm.idType = $stateParams.type_id;
      idProduct = $stateParams.product_id;
      getData($stateParams.type_id, $stateParams.product_id);
    }

    function getData(idType, idProduct){
      communicationFactory.products.get({type_id: idType, product_id: idProduct},
        function (data) {
          vm.product = data;
        },
        function () {
          $state.go('products', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function update(){
      var data = {
        name: vm.product.name,
        description: vm.product.description,
        available: vm.product.available
      };

      communicationFactory.products.update({type_id: $stateParams.type_id, product_id: $stateParams.product_id}, data,
        function () {
          $state.go('products', { type_id: $stateParams.type_id, message: 'Produkt został pomyślnie aktualizowany' });
        },
        function () {
          $state.go('products', { type_id: $stateParams.type_id, message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
