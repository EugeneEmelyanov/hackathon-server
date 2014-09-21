angular.module('api.projects', ['ngResource']).factory('ProjectsFactory', function ($resource) {
    return $resource('http://eugeneandrew-app1ica.rhcloud.com/api/v1/projects/:id', {id: '@_id'}, {
        save: {
            method: 'POST',
            responseType: 'json',
            transformResponse: function(data) {
                return data.item;
            }
        },
        runTest: {
            url: 'http://eugeneandrew-app1ica.rhcloud.com/api/v1/projects/:id/runTest',
        }
        // get: {
        //     method: 'GET',
        //     isArray: true
        //     // interceptor: {response: function (response) {
        //     //     var dealer = response.data;
        //     //     dealer.activeMakes = dealerHelper.sortMakes(dealer.activeMakes);
        //     //     decorateProducts(dealer);
        //     //     return dealer;
        //     // }}
        //     }
        // });
        });
});