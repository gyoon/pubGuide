var app = angular.module('lineChartApp', ['nvd3'])
.controller('lineChartCtrl', function($scope, $http, $timeout, $window) {

    var colors = ["#1e90e5", "#e1bce5", "#c4e6ff", "#e2f25c", '#75de97'];
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            strokeWidth: 0,
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
                stateChange: function(e){
                    console.log("stateChange");
                },
                changeState: function(e){ console.log("changeState"); },
                tooltipShow: function(e){ console.log("tooltipShow"); },
                tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            color: function(d,i){
                return (d.data && d.data.color) || colors[i % colors.length]
            },
            legend: {
                margin: {
                    top:0,
                    right:0
                },
                dispatch: {
                    legendClick: function(e, i){
                        if (e.area){
                            e.area = false;
                            linkHover();
                        } else {
                            e.area = true;
                            linkDefault();
                        }

                        $timeout(function() {
                            e.disabled = (e.disabled) ? false : false;
                        }, 10);

                        function linkDefault(){
                            d3.selectAll(".nv-legend .nv-series:nth-of-type(" + (i + 1) + ") rect")
                                .attr("style",function(d, i) {
                                    return "width:18px;height:18px;transform:translate(-9px,-9px);" + d3.selectAll(".nv-series:nth-of-type(" + (i + 1) + ") circle").attr('style') + "fill-opacity:0;stroke:#999"
                                });
                        }

                        function linkHover(){
                            d3.selectAll(".nv-legend .nv-series:nth-of-type(" + (i + 1) + ") rect")
                                .attr("style",function() {
                                    return "width:18px;height:18px;transform:translate(-9px,-9px);" + d3.selectAll(".nv-series:nth-of-type(" + (i + 1) + ") circle").attr('style') + "fill-opacity:.3;"
                                });
                        }


                    },
                    legendDblclick: function(e, i){
                        console.log(e)
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
                console.log("!!! lineChart callback !!!");
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

        var rectangle = d3.selectAll(".nv-legend g.nv-series");

        rectangle.append("rect")
            .attr("style","width:10px;height:10px")
            .attr("style",function(d, i) {
                return "width:18px;height:18px;transform:translate(-9px,-9px);"
                    + d3.selectAll(".nv-series:nth-of-type(" + (i + 1) + ") circle").attr('style') + "fill-opacity:.3;"
            });



        /*    .attr("text-anchor","middle")
            .attr("transform","translate(" + (textTranslate + 30) + ",10)")
            .attr("class","chartValue")
            .attr("style","font-weight:bold;fill:#596879")
            .text ('회사명');*/

        var series = d3.selectAll(".nv-series");
        series.attr("transform",
            function(d, i) {
                return "translate(400,"+ (i + 5) * 30 +")";
            }
        )
        var legendText = d3.selectAll(".nv-legend-text");
        legendText.attr("transform","translate(8,0)");

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