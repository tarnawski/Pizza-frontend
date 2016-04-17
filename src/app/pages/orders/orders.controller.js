(function () {
  'use strict';

  angular
    .module('pizzaFrontend.orders')
    .controller('OrdersController', OrdersController);

  /** @ngInject */
  function OrdersController(communicationFactory, $stateParams, $state, $timeout) {

    var vm = this;
    vm.refresh = refresh;
    vm.getPage = getPage;

    activate();

    function activate() {
      if($stateParams.message) {
        pushMessage($stateParams.message, 5000);
      }
      getData();
    }

    function refresh() {
      getData();
    }

    function getData() {
      communicationFactory.orders.get(function (data) {
        vm.orders = data._embedded.items;
        vm.page = data.page;
        vm.pages = data.pages;
        vm.total = data.pages;
      });
    }

    function filter() {
      var params = {
        page: vm.page
      };
      communicationFactory.orders.get(params, function (data) {
        vm.orders = data._embedded.items;
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
  }
})();
