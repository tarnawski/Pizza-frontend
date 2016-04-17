(function () {
  'use strict';

  angular
    .module('pizzaFrontend.products')
    .controller('createProductController', createProductController);

  /** @ngInject */
  function createProductController(communicationFactory, $state, $stateParams) {

    var vm = this;
    vm.save = save;

    activate();

    ////////////////////////////////

    function activate() {
      vm.idType = $stateParams.type_id;
    }

    function save(){

      var data = vm.product;

      communicationFactory.products.save({type_id: $stateParams.type_id}, data,
        function () {
          $state.go('products', { type_id: $stateParams.type_id, message: 'Produkt został pomyślnie dodany' });
      },
        function () {
          $state.go('products', { type_id: $stateParams.type_id, message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
