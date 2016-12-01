var app = angular.module('progressbarChartApp', ['ui.bootstrap'])
.controller('progressbarChartCtrl', function($scope, $http, $timeout) {

    $scope.anicheck = false;

    $timeout(function() {
        $scope.anicheck = true;
    }, 50);

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


})
.directive('progressChartDirective', function () {
    return {
        restrict: 'E',
        scope: {
            item: "=data"
        },
        link: function (scope, element, attribute) {
        },
        template: '<div class="kdb-progressChart">' +
        '<div class="title">{{item.key}}</div>' +
        '<div class="prChart">' +
        '<div class="progress-bar" style="width:{{item.y}}%"></div>' +
        '</div>' +
        '<div class="value">{{item.y}}</div>' +
        '</div>',
        replace: true
    };
})
