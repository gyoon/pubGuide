var app = angular.module('lineChartApp', ['nvd3'])
.controller('lineChartCtrl', function($scope, $http, $timeout, $window) {

    var colors = ["#1e90e5", "#e1bce5", "#c4e6ff", "#e2f25c", '#75de97'];
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 240,
            strokeWidth: 0,
            isArea: true,
            disabled: false,
            margin : {
                top: 0,
                right: 200,
                bottom: 40,
                left: 0
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function(e){},
                changeState: function(e){},
                tooltipShow: function(e){},
                tooltipHide: function(e){}
            },
            color: function(d,i){
                return (d.data && d.data.color) || colors[i % colors.length]
            },
            legend: {
                updateState: false,
                margin: {
                    top:0,
                    right:0
                },
                dispatch: {
                    legendClick: function(e, i){

                        angular.element(".nv-group").removeClass("area");
                        var seriesNum = ".nv-series-" + i

                        $timeout(function() {
                            angular.element(seriesNum).addClass("area");
                        }, 100);

                        $timeout(function() {
                            e.disabled = (e.disabled) ? false : false;
                        }, 10);

                    },
                    legendDblclick: function(e, i){


                    }
                }
            },
            xAxis: {
                tickFormat: function(d){
                    // var dateStr = d3.time.format('%x')(new Date(d))
                    var month = new Date(d).getMonth()+1;
                    var day =new Date(d).getDate();
                    return month + "/" + day
                },
                tickPadding:20,
                showMaxMin: false
            },
            yAxis: {
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                tickPadding:-60,
                showMaxMin: false
            },
            callback: function(chart){
            }
        }
    };

    $scope.data = lineData();

    function lineData() {
        var data1 = [], data2 = [], data3 = [], data4 = [], data5 = []

        for (var i = 0; i < 10; i++) {
            var lineDate = 1025409600000;

            data1.push({x: lineDate + (i * 1000000000), y: 100 * Math.random()});
            data2.push({x: lineDate + (i * 1000000000), y: 100 * Math.random()});
            data3.push({x: lineDate + (i * 1000000000), y: 100 * Math.random()});
            data4.push({x: lineDate + (i * 1000000000), y: 100 * Math.random()});
            data5.push({x: lineDate + (i * 1000000000), y: 100 * Math.random()});
        }

        return [
            {
                values: data1,
                key: '정상분석파일'
            },
            {
                values: data2,
                key: '악성코드'
            },
            {
                values: data3,
                key: '유포지'
            },
            {
                values: data4,
                key: '경유지'
            },
            {
                values: data5,
                key: 'C&C'
            }
        ];
    };

    $scope.legendReset = function() {

        var resetBtn = d3.selectAll(".nv-legend").select("g");

        resetBtn
            .append("g")
            .attr("transform","translate(0,0)")
            .append("text")
            .attr("text-anchor","start")
            .attr("class","nv-reset")
            .attr("dy",".32em")
            .attr("dx","8")
            .attr("fill","#000")
            .text ('초기화');

        $( ".nv-reset" ).click(function() {
            angular.element(".nv-group").removeClass("area");
        });
    };

    $timeout(function() {
        $scope.legendReset();
    }, 10);

    $window.onresize = function(){
        $timeout(function() {
            $scope.legendReset();
        }, 10);
    }


});