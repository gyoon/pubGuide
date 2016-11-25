app
.controller('inforchartCtrl', function($scope, $http, $timeout) {

    $scope.anicheck = false;

    $timeout(function() {
        $scope.anicheck = true;
    }, 100);

    $scope.data = [
        {
            name: "정상분석파일",
            max: "500000",
            today: "130"
        },
        {
            name: "악성코드",
            max: "200784",
            today: "45"
        },
        {
            name: "유포지",
            max: "5000",
            today: "30"
        },
        {
            name: "경유지",
            max: "15000",
            today: "13"
        },
        {
            name: "C&C",
            max: "55000",
            today: "34"
        }
    ];

    $scope.todayDate = new Date();

})
.directive('inforChartDirective', function () {
    return {
        restrict: 'E',
        scope: {
            item: "=data"
        },
        link: function (scope, element, attribute) {
        },
        template:resolveTemplate,
        replace: true
    };
})

function resolveTemplate(tElement, tAttrs) {
    return '<div class="item">' +
    '<div class="title">{{item.name}}</div>' +
    '<div class="value"><span>{{item.today}}</span> / {{item.max}}</div>' +
    '</div>'
}