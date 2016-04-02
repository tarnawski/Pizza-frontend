(function ()
{
    'use strict';
    angular
        .module('pizzaFrontend')
        .service('communicationFactory', communicationFactory);

    /** @ngInject */
    function communicationFactory($resource, CONSTANTS) {
        return {
            categories: $resource(CONSTANTS.BASE_URL + '/api/categories'),
            issues: $resource(CONSTANTS.BASE_URL + '/api/issues/:issue_id'),
            tags: $resource(CONSTANTS.BASE_URL + '/api/tags/:tag_id'),
            devices: $resource(CONSTANTS.BASE_URL + '/api/me/devices/:device_id'),
            regions: $resource(CONSTANTS.BASE_URL + '/api/me/regions/:region_id',null,{'update': {method: 'PUT'}}),
            regionNotifications: $resource(CONSTANTS.BASE_URL + '/api/me/regions/:region_id/notifications/:notification_id')
        };
    }
})();
