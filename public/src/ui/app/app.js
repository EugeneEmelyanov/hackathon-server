angular.module('ui.app', ['ngRoute', 'ui.projects', 'ui.details'])

.controller('MainController', function($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
})

.controller('AppProjectsController', function($scope, $routeParams) {
    $scope.params = $routeParams;
})

.controller('AppDetailsController', function($scope, $routeParams) {
    $scope.params = $routeParams;
})

.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/ui/app/projects.html',
            controller: 'AppProjectsController'
        })
        .when('/details/:projectsId', {
            templateUrl: 'src/ui/app/details.html',
            controller: 'AppDetailsController'
        })
        .otherwise({
            redirectTo: '/'
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);

    // $httpProvider.defaults.transformRequest =  function(obj) {
    //     var str = [];
    //     console.log(obj;)
    //     for(var p in obj)
    //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //     }
    //     return str.join("&");
    // };
});