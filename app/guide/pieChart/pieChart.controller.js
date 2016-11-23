var app = angular.module('pieChartApp', ['nvd3'])
.controller('pieChartCtrl', function($scope, $http, $timeout, $window) {

    var colors = ["#1e90e5", "#64b5f1", "#9fd4fa", "#cfeafd", '#ffffff'];
    $scope.options = {
        chart: {
            type: 'pieChart',
            height: 300,
            x: function(d){return d.key;},
            y: function(d){return d.y;},
            showLabels: false,
            duration: 500,
            useInteractiveGuideline: true,
            labelThreshold: 0.01,
            labelSunbeamLayout: false,
            donut: true,
            donutRatio: 0.40,
            color: function(d,i){
                return (d.data && d.data.color) || colors[i % colors.length]
            },
            legend: {
                margin: {
                    top:40
                },
            },
            legendPosition: 'right'
        },
        styles: {
            css: {
                filter: 'url(#dropshadow)'
            }
        }
    };

    $scope.data = [
        {
            key: "삼성생명",
            y: 100
        },
        {
            key: "삼성화재",
            y: 83
        },
        {
            key: "삼성SDS",
            y: 20
        },
        {
            key: "삼성물산",
            y: 40
        },
        {
            key: "삼성증권",
            y: 13
        }
    ];

    $scope.legendReset = function() {
        var chartValue = d3.selectAll(".chartValue")
        chartValue.remove();

        var series = d3.selectAll(".nv-series");

        d3.selectAll(".nv-series text").attr("style","fill:#596879")

        var legendText = d3.selectAll(".nv-legend-text");
        legendText.attr("transform","translate(8,0)");

        var legendValue = series.append("text");
        legendValue
        .attr("width","100")
        .attr("text-anchor","middle")
        .attr("transform","translate(110,4)")
        .attr("style","fill:#596879")
        .attr("class","chartValue")
        .text (
            function(d, i) {
                return d.y;
            }
        );

        var legend = d3.selectAll(".nv-legend");
        var legendTitle = legend.append("text");
        var legendCode = legend.append("text");
        var textTranslate = Number(d3.selectAll(".nv-legend > g").attr('transform').replace(/[^0-9^.]/g,''));

        legendTitle
            .attr("text-anchor","middle")
            .attr("transform","translate(" + (textTranslate + 30) + ",10)")
            .attr("class","chartValue")
            .attr("style","font-weight:bold;fill:#596879")
            .text ('회사명');
        legendCode
            .attr("text-anchor","middle")
            .attr("transform","translate(" + (textTranslate + 110) + ",10)")
            .attr("class","chartValue")
            .attr("style","font-weight:bold;fill:#596879")
            .text ('악성코드');
    };

    $scope.shadow = function() {
         var defs = d3.selectAll(".nv-pie").append("defs");

         var filter = defs.append("filter")
             .attr("id", "drop-shadow")
             .attr("height", "130%");
         filter.append("feGaussianBlur")
             .attr("in", "SourceAlpha")
             .attr("stdDeviation", 4)
             .attr("result", "blur");
         filter.append("feOffset")
             .attr("in", "blur")
             .attr("dx", 2)
             .attr("dy", 2)
             .attr("result", "offsetBlur");

         var feComponentTransfer = filter.append("feComponentTransfer");
         feComponentTransfer.append("feFuncA")
             .attr("type", "linear")
             .attr("slope", 0.2);

         filter.append("feComponentTransfer")
             .attr("type", "linear")
             .attr("dx", 2)
             .attr("dy", 2)
             .attr("result", "offsetBlur");

         var feMerge = filter.append("feMerge");
         feMerge.append("feMergeNode")
             .attr("in", "offsetBlur")
         feMerge.append("feMergeNode")
             .attr("in", "SourceGraphic");

         d3.selectAll(".nv-pie").style("filter", "url(#drop-shadow)")

         $scope.legendReset();
    }

    $timeout(function() {
        $scope.shadow()
    }, 10);


    $window.onresize = function(){
        $timeout(function() {
            $scope.legendReset();
        }, 10);
    }

});