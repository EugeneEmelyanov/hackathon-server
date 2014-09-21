angular.module('api.details', ['ngResource']).factory('DetailsFactory', function ($resource) {
    return $resource('/resources/data/details.json', {}, {
        get: {
            method: 'GET',
            isArray: true
            // interceptor: {response: function (response) {
            //     var dealer = response.data;
            //     dealer.activeMakes = dealerHelper.sortMakes(dealer.activeMakes);
            //     decorateProducts(dealer);
            //     return dealer;
            // }}
            }
        });
});