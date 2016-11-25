var app = angular.module('minitableApp', [])
.controller('minitableCtrl', function($scope, $http) {

    $scope.data = [
        {
            name: "알람명01",
            rule: "웹로그",
            company: "삼성생명"
        },
        {
            name: "알람명02",
            rule: "웹로그",
            company: "삼성생명"
        },
        {
            name: "알람명03",
            rule: "웹로그",
            company: "삼성생명"
        },
        {
            name: "알람명04",
            rule: "웹로그",
            company: "삼성생명"
        },
        {
            name: "알람명05",
            rule: "웹로그",
            company: "삼성생명"
        }
    ];

    $scope.data2 = [
        {
            name: "알람명01",
            date: "2016-11-15 00:00:00"
        },
        {
            name: "알람명02",
            date: "2016-11-15 00:00:00"
        },
        {
            name: "알람명03",
            date: "2016-11-15 00:00:00"
        },
        {
            name: "알람명04",
            date: "2016-11-15 00:00:00"
        },
        {
            name: "알람명05",
            date: "2016-11-15 00:00:00"
        }
    ];

})
.directive('miniTableDirective', function () {
    return {
        restrict: 'E',
        scope: {
            item: "=data",
            cell: "=col"
        },
        link: function (scope, element, attribute) {
        },
        template:resolveTemplate,
        replace: true
    };
})

function resolveTemplate(tElement, tAttrs) {
    switch (tAttrs.col) {
        case '3' : return '<div class="tablebody"><div>{{item.name}}</div><div>{{item.rule}}</div><div>{{item.company}}</div></div>'; break;
        case '2' : return '<div class="tablebody"><div>{{item.name}}</div><div>{{item.date}}</div></div>'; break;
        default : return; break;
    }

}