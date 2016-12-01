var app = angular.module('kdbApp', [
    'ngRoute',
    'nvd3',
    'ui.bootstrap',
    'datatables',
    'datatables.buttons',
    'toggle-switch',
    'localytics.directives',
    'daterangepicker',
    'ngTagsInput'
])
.controller('indexCtrl', function($scope, $http) {
    console.log('index')
});