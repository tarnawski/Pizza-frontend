(function () {
  'use strict';

  angular
    .module('pizzaFrontend.customers')
    .controller('CustomersController', CustomersController);

  /** @ngInject */
  function CustomersController(communicationFactory) {

    var vm = this;
    vm.search = search;
    vm.reset = resetFilters;

    activate();

    function activate() {
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
      var params = {
        limit: vm.limit,
        first_name: vm.firstName,
        last_name: vm.lastName,
        email: vm.email,
        phone: vm.phone,
        address: vm.address
      };
      console.log(params);
      communicationFactory.customers.get(params, function (data) {
        vm.customers = data._embedded.items;
        vm.page = data.page;
        vm.pages = data.pages;
        vm.total = data.pages;
      });
    }

  }
})();
