var app = angular.module('datatablesApp', ['datatables'])
.controller('datatablesCtrl', function($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {

    var vm = this;
    vm.testData = [];

    for (var i = 0 ; i<50 ; i ++) {
        vm.testData.push({
            id : i,
            title : '공지사항입니다.',
            date : '1981.02.07'
        })
    }

    vm.dtOptions = DTOptionsBuilder
        .fromFnPromise(function() {
            return vm.testData;
        })
        .withPaginationType('full_numbers')
        .withOption('responsive', true);

    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1).notVisible(),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];

    $scope.data =  vm.testData

});