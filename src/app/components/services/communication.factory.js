(function ()
{
    'use strict';
    angular
        .module('pizzaFrontend')
        .service('communicationFactory', communicationFactory);

    /** @ngInject */
    function communicationFactory($resource, CONSTANTS) {
        return {
            customers: $resource(CONSTANTS.BASE_URL_API + '/api/customers'),
            application: $resource(CONSTANTS.BASE_URL_API + '/api/application')
        };
    }
})();
