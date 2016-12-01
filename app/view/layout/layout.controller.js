app
.config(function ($routeProvider) {
    $routeProvider
        .when('/Dashboard', {templateUrl: './view/dashboard/dashboard.html', controller: 'dashboardCtrl'})
        .when('/Rule', {templateUrl: './view/rule/ruleList.html', controller: 'ruleListCtrl'})
        .when('/RuleAdd', {templateUrl: './view/rule/ruleAdd.html', controller: 'ruleAddCtrl'})
        .when('/Alert', {templateUrl: './view/alert/alert.html', controller: 'alertCtrl'})
        .when('/Search', {templateUrl: './view/search/search.html', controller: 'searchCtrl'})
        .otherwise({redirectTo: '/Dashboard'});
})
.controller('layoutCtrl', function($scope, $http) {
    console.log('layout')
})
