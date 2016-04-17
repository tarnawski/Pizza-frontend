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
            orders: $resource(CONSTANTS.BASE_URL_API + '/api/orders/:id',{id: '@_id'}, {
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
            products: $resource(CONSTANTS.BASE_URL_API + '/api/types/:type_id/products/:product_id',
              {
                type_id: '@_type_id',
                product_id: '@_product_id'
              },
              {
              update: {
                method: 'PUT'
              }
            }),
            prices: $resource(CONSTANTS.BASE_URL_API + '/api/types/:type_id/products/:product_id/prices/:price_id',
              {
                type_id: '@_type_id',
                product_id: '@_product_id',
                price_id: '@_price_id'
              },
              {
                update: {
                  method: 'PUT'
                }
              })

        };
    }
})();
