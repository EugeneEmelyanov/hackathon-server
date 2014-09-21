angular.module('ui.details', ['api.details', 'ui.loading-indicator', 'ui.summary'])

.controller('DetailsController', function($scope, DetailsFactory) {
    $scope.project = DetailsFactory.get({});
    $scope.$watch('project', function() {
        $scope.summary = $scope.project.map(function(item) {
            return {
                date: item.date,
                summary: item.summary
            };
        });
    }, true);
})
.directive('details', function () {
    return {
        restrict: 'E',
        replace: true,
        controller: 'DetailsController',
        templateUrl: 'src/ui/details/details.html',
        scope: {
        },
        link: function ($scope, $element, $attrs) {
        }
    };
});