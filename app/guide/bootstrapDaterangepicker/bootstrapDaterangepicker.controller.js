var app = angular.module('brdatepickerApp', ['daterangepicker'])
.controller("brdatepickerCtrl", function($scope) {

    $scope.date = {startDate: "2016-11-24T07:23:27.725Z", endDate: "2016-11-25T07:23:27.726Z" }

    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Apply",
            fromLabel: "From",
            format: "YYYY-MM-DD",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range'
        },
        ranges: {
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()]
        }
    };

});
