angular.module('ui.header', [])

.directive('header', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'src/ui/header/header.html',
        scope: {
        },
        link: function ($scope, $element, $attrs) {
        }
    };
});