var app = angular.module('modalApp', ['ui.bootstrap'])
.controller("modalCtrl", function($scope, $uibModal, $log, $document) {

    var vm = this;
    vm.animationsEnabled = true;

    vm.open = function (size) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'vm',
            size: size,
            resolve: {

            }
        });
    };
})
.controller('ModalInstanceCtrl', function ($uibModalInstance) {
    var vm = this;
    vm.ok = function () {
        $uibModalInstance.close();
    };
    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})
