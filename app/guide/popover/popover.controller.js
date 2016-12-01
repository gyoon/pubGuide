var app = angular.module('popoverApp', ['ui.bootstrap'])
.controller('popoverCtrl', function($scope, $http) {

    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title'
    };

});