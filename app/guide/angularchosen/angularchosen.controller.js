var app = angular.module('angularchosenApp', ['localytics.directives'])
.controller('angularchosenCtrl', function($scope, $http) {

    $scope.states = [
        {id: 1, tite: 'Alaska'},
        {id: 2, title: 'Arizona'},
        {id: 3, title: 'Arkansas'},
        {id: 4, title: 'California'}
    ];

});