angular.module('ui.loading-indicator', [])

.directive('loadingIndicator', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/ui/loading-indicator/loading-indicator.html',
        scope: {
        },
        link: function ($scope, $element, $attrs) {
        }
    };
});