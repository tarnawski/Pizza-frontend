(function() {
  'use strict';

  angular
    .module('pizzaFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
