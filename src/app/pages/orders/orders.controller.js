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
    vm.remove = remove;
    vm.changeStatus = changeStatus;

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

    function changeStatus(id){
      var data = {
        realized: true
      };
      communicationFactory.orders.update({id: id}, data,
        function (data) {
          $state.go($state.current, {message: 'Status zostałzmieniony.'}, {reload: true});
        },
        function () {
          $state.go('orders', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

    function remove(id){
      communicationFactory.orders.delete({id: id},
        function (data) {
          $state.go($state.current, {message: 'Zamówiówienie zostało usunięte.'}, {reload: true});
        },
        function () {
          $state.go('orders', { message: 'Błąd aplikacji. Jeśli problem będzie się powtarzał skontaktuj się z administratorem.' });
        }
      );
    }

  }
})();
