angular.module('ui.create', ['api.projects', 'ui.loading-indicator', 'ui.bootstrap'])


.factory('CreateFactory', function(ProjectsFactory, $modal, $log) {


    var ModalInstanceCtrl = function ($scope, $modalInstance) {
        function validate() {
            return $scope.project.name && $scope.project.url;
        }

        $scope.ok = function () {
            if (validate()) {
                $modalInstance.close('ok');
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    var open = function ($scope, size) {

        $scope.project = new ProjectsFactory();

        var modalInstance = $modal.open({
            templateUrl: 'src/ui/create/create-form.html',
            controller: ModalInstanceCtrl,
            size: size,
            keyboard: false,
            scope: $scope
        });

        return modalInstance.result.then(function (result) {
            return $scope.project.$save();
        }, function () {
            $scope.project = null;
        });
    };

    return {
        run: function($scope) {
            return open($scope, 'large');
        }
    }
})
.controller('CreateController', function($scope, CreateFactory) {
    $scope.create = function() {
        $scope.creatingItem = true;
        CreateFactory.run($scope)
            .then(function(project) {
                $scope.creatingItem = false;
                if (project) {
                    $scope.projects.push(project);
                }
            }).catch(function(error) {
                $scope.creatingItem = false;
            });
    };
})
.directive('create', function () {
    return {
        restrict: 'E',
        replace: true,
        controller: 'CreateController',
        templateUrl: 'src/ui/create/create.html',
        scope: true,
        link: function ($scope, $element, $attrs) {
        }
    };
});