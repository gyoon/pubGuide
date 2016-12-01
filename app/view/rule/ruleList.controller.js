app
.controller('ruleListCtrl', function($compile, $scope, $uibModal, $http, $timeout, DTOptionsBuilder, DTColumnBuilder) {

    var vm = this;
    var data = [];
    vm.dtInstance = {};
    vm.search = search;
    vm.selected = {};
    vm.selectAll = false;
    vm.toggleAll = toggleAll;
    vm.toggleOne = toggleOne;
    vm.animationsEnabled = true;

    var lang = {
        "decimal":        "",
        "emptyTable":     "No data available in table",
        "info":           "_START_ / _END_ 총 _TOTAL_",
        "infoEmpty":      "Showing 0 to 0 of 0 entries",
        "infoFiltered":   "(filtered from _MAX_ total entries)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "_MENU_ 개씩 보기",
        "loadingRecords": "로딩중 입니다.",
        "processing":     "Processing...",
        "search":         "",
        "zeroRecords":    "검색된 결과가 없습니다.",
        "paginate": {
            "first":      "<<",
            "last":       ">>",
            "next":       ">",
            "previous":   "<"
        },
        "aria": {
            "sortAscending":  ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
        }
    };

    for (var i = 0 ; i<50 ; i ++) {
        data.push({
            id : i,
            ruleName : '규칙 A' + i,
            date : '2016-11-03 10:00:00',
            writer : '홍길동',
            manager : '김철수'
        })
    }

    var titleHtml = '<input type="checkbox" ng-model="vm.selectAll" ng-click="vm.toggleAll(vm.selectAll, vm.selected)">';

    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('data', data)
        .withDOM('<"information"Bi>rt<"bottom"lp>')
        .withOption('language', lang)
        .withOption('createdRow', function(row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        })
        .withOption('headerCallback', function(header) {
            if (!vm.headerCompiled) {
                vm.headerCompiled = true;
                $compile(angular.element(header).contents())($scope);
            }
        })
        .withOption('order', [1, 'desc'])
        .withPaginationType('full_numbers')
        .withButtons([
            {
                text: '삭제',
                key: '1',
                action: function (e, dt, node, config) {
                    vm.modalOpen('sm')
                }
            },
            {
                text: '내보내기',
                key: '1',
                action: function (e, dt, node, config) {
                    alert('Button activated');
                }
            }
        ]);

    vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable().withOption('width', '15px')
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id] = false;
                return '<input type="checkbox" ng-model="vm.selected[' + data.id + ']" ng-click="vm.toggleOne(vm.selected)">';
            }),
        DTColumnBuilder.newColumn('ruleName').withTitle('규칙명'),
        DTColumnBuilder.newColumn('date').withTitle('생성일시').withOption('width', '160px'),
        DTColumnBuilder.newColumn('writer').withTitle('생성자').withOption('width', '60px'),
        DTColumnBuilder.newColumn('manager').withTitle('담당자').withOption('width', '60px'),
        DTColumnBuilder.newColumn(null).withTitle('활성화').notSortable().withOption('width', '60px')
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id] = false;
                return ("<toggle-switch  class=switch-mini ng-model=model" + data.id + "></toggle-switch>");
            }),
        DTColumnBuilder.newColumn(null).withTitle('미리보기').notSortable().withOption('width', '60px')
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id] = false;
                return '<span uib-popover-template="ruleTemplate.templateUrl" data-toggle="popover" popover-toggle="ruleTemplate.isOpen" popover-placement="bottom-right" class="isClick glyphicon glyphicon-eye-open iconCenter" aria-hidden="true"></span>';
            })
    ];

    function toggleAll (selectAll, selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                selectedItems[id] = selectAll;
            }
        }
    }

    function toggleOne (selectedItems) {
        for (var id in selectedItems) {
            if (selectedItems.hasOwnProperty(id)) {
                if(!selectedItems[id]) {
                    vm.selectAll = false;
                    return;
                }
            }
        }
        vm.selectAll = true;
    }

    function search(query, dtInstance) {
        dtInstance.DataTable.search(query);
        dtInstance.DataTable.draw();
    }

    $scope.ruleTemplate = {
        isOpen: false,
        content: 'rule 시나리오',
        templateUrl: 'ruleTemplate.html'
    };

    vm.modalOpen = function (size) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modaldelete.html',
            controller: function ($uibModalInstance) {
                var vm = this;
                vm.ok = function () {
                    $uibModalInstance.close();
                    $scope.addAlert()
                };
                vm.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: 'vm',
            size: size,
            resolve: {

            }
        });
    };


    $scope.anicheck = false;

    $scope.alerts = [];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: '삭제가 완료되었습니다.'});
        $timeout(function() {
            $scope.anicheck = true;
            $timeout(function() {
                $scope.anicheck = false;
                $timeout(function() {
                    $scope.closeAlert()
                }, 100);
            }, 3000);
        }, 50);
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

})
.directive('closebtn', function () {
    return {
        restrict: 'A',
        link: function(scope, element) {

            element.bind('click', function(e) {
                angular.element(e.target.parentNode).closest('.popover').prev().trigger('click')
            });
        }
    };
});