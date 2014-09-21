angular.module('ui.chart', ['nvd3'])

.controller('ChartController', function($scope) {
    // function convert(data) {
    //     return [
    //         {
    //             bar: true,
    //             key: 'Total Maintainability',
    //             values: data.map(function(item) {
    //                 return {
    //                     key: item.date,
    //                     value: item.summary.total.maintainability
    //                 };
    //             })
    //         },
    //         {
    //             key: 'Average Maintainability',
    //             values: data.map(function(item) {
    //                 return {
    //                     key: item.date,
    //                     value: item.summary.average.maintainability
    //                 };
    //             })
    //         }
    //     ]
    // }
    // //console.log($scope.data);
    // // $scope.chartData = convert($scope.data);
    

    // $scope.$watch('data', function(newValue, oldValue) {
    //     $scope.chartData = convert(newValue);
    //     console.log($scope.chartData)
    // }, true);
    // var handler;

    // angular.element($window).bind('resize', function(argument) {
    //     $scope.options.chart.width = $element[0].clientWidth;
    //     //console.log(r);
    //     $timeout.cancel(handler);
    //     handler = $timeout($scope.api.refresh, 0, false);
    // });
})
.directive('chart', function () {
    return {
        restrict: 'E',
        replace: true,
        controller: 'ChartController',
        templateUrl: 'src/ui/chart/chart.html',
        scope: {
            data: '=data'
        },
        link: function ($scope, $element, $attrs) {
            var dateFormat = d3.time.format("%m/%d/%Y");
            $scope.options = {
                chart: {
                    type: 'linePlusBarChart',//'multiBarChart',//'discreteBarChart',//'historicalBarChart',
                    height: 200,
                    width: $element[0].clientWidth,
                    margin : {
                        top: 10,
                        right: 45,
                        bottom: 30,
                        left: 50
                    },
                    color: d3.scale.category10().range(),
                    stacked: false,
                    x: function(d){
                        return (new Date(d.key))
                            .setHours(12, 0, 0, 0);
                    },
                    y: function(d){return d.value;},
                    // showValues: true,
                    valueFormat: function(d){
                        // return d || 'no data';
                        return d3.format(',.1f')(d);
                    },
                    xAxis: {
                        //axisLabel: 'X Axis',
                        // ticks: 6
                        tickFormat: function(d){
                            return dateFormat(new Date(d));
                        },
                    },
                    yAxis: {
                        //axisLabel: 'Y Axis',
                        tickFormat: function(d){
                            return d3.format(',.2f')(d);;
                        },
                        //ticks: 1
                    },
                    y1Axis: {
                        //axisLabel: 'Y1 Axis',
                        tickFormat: function(d){return d3.format(',.2f')(d)}
                    },
                    y2Axis: {
                        //axisLabel: 'Y2 Axis',
                        tickFormat: function(d) { return d3.format(',.2f')(d);}
                    },
                    // reduceXTicks: true,
                    // tooltips: true,
                    // tooltip: function(key, x, y, e, graph) {
                    //     console.log(arguments)
                    //     return '<h3>' + key + '</h3>' +
                    //            '<p>' +  x + '</p>';
                    // },
                    // tooltipContent: function(key, x, y, e, graph) {
                    //     console.log(arguments)
                    //     return '<h3>' + key + '</h3>' +
                    //            '<p>' +  x + '</p>';
                    // },
                    // transitionDuration: 1,
                    // animate: false,
                    
                    // showYAxis: true,
                    // showXAxis: true,
                    // showLegend: false,
                    // showControls: false,
                    // reduceXTicks: false,
                    // reduceYTicks: true,
                    // delay: 0,
                    // showDist: true,
                    // clipEdge: true,
                    // staggerLabels: false,
                    // highlightZero: true,
                    forceY: [],
                    //  xDomain: [1,6]
                    //color: ['#5290e9']
                }
            };
        }
    };
});