var app = angular.module('uiSelectApp', ['ui.select'])
.controller("uiSelCtrl", function() {

        var vm = this;
        vm.isLoaded = false;
        vm.values = [{
            'key': 22,
            'value': 'Kevin'
        }, {
            'key': 24,
            'value': 'Fiona'
        }];
        vm.selected;

});
