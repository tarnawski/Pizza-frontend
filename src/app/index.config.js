(function() {
  'use strict';

  angular
    .module('pizzaFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, CONSTANTS) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Push interceptor
    $httpProvider.interceptors.push('authInterceptor');

  }

})();
