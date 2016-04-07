(function() {
  'use strict';

  angular
    .module('pizzaFrontend', [
      // Plugins
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr',
      'toaster',
      'angular-storage',

      // App modules
      'pizzaFrontend.login',
      'pizzaFrontend.dashboard',
      'pizzaFrontend.customers',
      'pizzaFrontend.profile',
      'pizzaFrontend.promocodes'
    ]);

})();
