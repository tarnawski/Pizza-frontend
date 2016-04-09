(function () {
  'use strict';

  angular
    .module('pizzaFrontend.customers')
    .controller('updateCustomerController', updateCustomerController);

  /** @ngInject */
  function updateCustomerController(communicationFactory, $stateParams, $state) {

    var vm = this;
    var idCustomer;
    vm.update = update;

    activate();

    ////////////////////////////////

    function activate(){
      idCustomer = $stateParams.id;
      getData(idCustomer);
    }

    function getData(id){
      communicationFactory.customers.get({id: id },
        function (data) {
          vm.customer = data;
        },
        function () {
          $state.go('customers', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }


    function update(){

      var data = {
        first_name: vm.customer.first_name,
        last_name: vm.customer.last_name,
        email: vm.customer.email,
        phone: vm.customer.phone,
        address: vm.customer.address
        };

      communicationFactory.customers.update({id: idCustomer}, data,
        function () {
          $state.go('customers', { message: 'Dane klienta zostały pomyślnie aktualizowane' });
      },
        function () {
          $state.go('customers', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }
  }
})();
