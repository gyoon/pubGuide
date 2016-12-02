app
.config(function ($routeProvider) {
    $routeProvider
        .when('/Login', {templateUrl: './view/index/login.html', controller: 'loginCtrl'})
        .when('/Logout', {templateUrl: './view/index/logout.html', controller: 'logoutCtrl'})
        .when('/Dashboard', {templateUrl: './view/dashboard/dashboard.html', controller: 'dashboardCtrl'})
        .when('/Rule', {templateUrl: './view/rule/ruleList.html', controller: 'ruleListCtrl'})
        .when('/RuleAdd', {templateUrl: './view/rule/ruleAdd.html', controller: 'ruleAddCtrl'})
        .when('/Alert', {templateUrl: './view/alert/alert.html', controller: 'alertCtrl'})
        .when('/Search', {templateUrl: './view/search/search.html', controller: 'searchCtrl'})
        .when('/Admin/user', {templateUrl: './view/admin/user/user.html', controller: 'userCtrl'})
        .when('/Admin/authority', {templateUrl: './view/admin/authority/authority.html', controller: 'authorityCtrl'})
        .when('/Admin/auditLog', {templateUrl: './view/admin/auditLog/auditLog.html', controller: 'auditLogCtrl'})
        .when('/Admin/monitoring', {templateUrl: './view/admin/monitoring/monitoring.html', controller: 'monitoringCtrl'})
        .otherwise({redirectTo: '/Dashboard'});
})
.controller('layoutCtrl', function($scope, $http) {
    console.log('layout')
})
