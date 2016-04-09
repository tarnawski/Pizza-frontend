(function ()
{
    'use strict';
    angular
        .module('pizzaFrontend')
        .service('communicationFactory', communicationFactory);

    /** @ngInject */
    function communicationFactory($resource, CONSTANTS) {
        return {
            customers: $resource(CONSTANTS.BASE_URL_API + '/api/customers/:id',{id: '@_id'}, {
              update: {
                method: 'PUT'
              }
            }),
            application: $resource(CONSTANTS.BASE_URL_API + '/api/application'),
            promocodes: $resource(CONSTANTS.BASE_URL_API + '/api/promocodes/:id',{id: '@_id'}, {
              update: {
                method: 'PUT'
              }
            }),
            types: $resource(CONSTANTS.BASE_URL_API + '/api/types/:id',{id: '@_id'}, {
              update: {
                method: 'PUT'
              }
            }),
            products: $resource(CONSTANTS.BASE_URL_API + '/api/products/:id',{id: '@_id'}, {
              update: {
                method: 'PUT'
              }
            })

        };
    }
})();
