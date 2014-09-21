angular.module('ui.projects', ['api.projects', 'ui.loading-indicator', 'ui.create', 'ui.header'])

.controller('ProjectsController', function($scope, ProjectsFactory) {
    $scope.projects = ProjectsFactory.query({page: 2})
    $scope.projects.$promise.catch(function() {
            $scope.hasError = true;
        });

    $scope.runTest = function(project, index) {
        project.$running = true;
        project.$runStatus = '';
        project.$runTest().then(function() {
            project.$running = false;
            project.$runStatus = 'success';
        }).catch(function() {
            project.$running = false;
            project.$runStatus = 'error';
        });
    };

    $scope.removeProject = function(project, index) {
        project.$delete(project).then(function() {
            $scope.projects.splice(index, 1);
        });
    }
})
.directive('projects', function () {
    return {
        restrict: 'E',
        replace: true,
        controller: 'ProjectsController',
        templateUrl: 'src/ui/projects/projects.html',
        scope: {
        },
        link: function ($scope, $element, $attrs) {
        }
    };
});
