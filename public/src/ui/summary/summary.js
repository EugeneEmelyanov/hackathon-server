angular.module('ui.summary', ['ui.chart'])

.controller('SummaryController', function($scope) {
    function convert(data) {
        return {
            maintainability: [
                {
                    bar: true,
                    key: 'Total Maintainability',
                    values: data.map(function(item) {
                        return {
                            key: item.date,
                            value: item.summary.total.maintainability
                        };
                    })
                },
                {
                    key: 'Average Maintainability',
                    values: data.map(function(item) {
                        return {
                            key: item.date,
                            value: item.summary.average.maintainability
                        };
                    })
                }
            ],
            sloc: [
                {
                    bar: true,
                    key: 'Total SLOC',
                    values: data.map(function(item) {
                        return {
                            key: item.date,
                            value: item.summary.total.sloc
                        };
                    })
                },
                {
                    key: 'Average SLOC',
                    values: data.map(function(item) {
                        return {
                            key: item.date,
                            value: item.summary.average.sloc
                        };
                    })
                }
            ]
        };
    }
    //console.log($scope.data);
    // $scope.chartData = convert($scope.data);
    

    $scope.$watch('data', function(newValue, oldValue) {
        console.log($scope.data)
        $scope.chartData = convert(newValue);
    }, true);
    //var handler;

    // angular.element($window).bind('resize', function(argument) {
    //     $scope.options.chart.width = $element[0].clientWidth;
    //     //console.log(r);
    //     $timeout.cancel(handler);
    //     handler = $timeout($scope.api.refresh, 0, false);
    // });
})
.directive('summary', function () {
    return {
        restrict: 'E',
        replace: true,
        controller: 'SummaryController',
        templateUrl: 'src/ui/summary/summary.html',
        scope: {
            data: '=data'
        },
        link: function ($scope, $element, $attrs) {
           
        }
    };
});