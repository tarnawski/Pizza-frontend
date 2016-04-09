(function () {
  'use strict';

  angular
    .module('pizzaFrontend.customers')
    .controller('CustomersController', CustomersController);

  /** @ngInject */
  function CustomersController(communicationFactory, $stateParams, $state, $timeout) {

    var vm = this;
    vm.search = search;
    vm.reset = resetFilters;
    vm.remove = remove;
    vm.getPage = getPage;

    activate();

    function activate() {
      if($stateParams.message) {
        pushMessage($stateParams.message, 5000);
      }
      communicationFactory.customers.get(function (data) {
        vm.customers = data._embedded.items;
        vm.page = data.page;
        vm.pages = data.pages;
        vm.total = data.pages;
      });
    }

    function resetFilters() {
        vm.page = '';
        vm.limit = '';
        vm.firstName = '';
        vm.lastName = '';
        vm.email = '';
        vm.phone = '';
        vm.address = '';
        activate();
    }

    function search() {
      vm.page = 1;
      filter();
    }

    function filter() {
      var params = {
        page: vm.page,
        limit: vm.limit,
        first_name: vm.firstName,
        last_name: vm.lastName,
        email: vm.email,
        phone: vm.phone,
        address: vm.address
      };
      communicationFactory.customers.get(params, function (data) {
        vm.customers = data._embedded.items;
        vm.page = data.page;
        vm.pages = data.pages;
        vm.total = data.pages;
      });
    }

    function getPage(page) {
      vm.page = page;
      filter();
    }

    function pushMessage(message, time){
      vm.count = true;
      vm.info = message;
      $timeout(function () { vm.count = false; }, time);
    }

    function remove(id){
      communicationFactory.customers.delete({id: id},
        function (data) {
          $state.go('customers', { message: 'Klient został usunięty.' });
        },
        function () {
          $state.go('customers', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

  }
})();
