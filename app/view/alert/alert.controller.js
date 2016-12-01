app.controller('alertCtrl', function($compile, $scope, $uibModal, $http, $timeout, DTOptionsBuilder, DTColumnBuilder) {

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
            file : 'download.neoiplus.com/VSiPlus_Plus/2016110802/print/kor/def/SHDM0070_12download.neoiplus.com/VSiPlus_Plus/2016110802/print/kor/def/SHDM0070_12.drf.zi' + i,
            date : '2016-11-03 10:00:00',
            rulename : '규칙',
            constructor : '홍길동',
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
                text: '다운로드',
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
        DTColumnBuilder.newColumn('file').withTitle('파일')
            .renderWith(function(data, type, full, meta) {
                $scope.tagData = 'tag';
                return data + '<br> <span class="label label-warning isClick" ng-click="vm.tagSearch(tagData)">{{tagData}}</span>';
            }),
        DTColumnBuilder.newColumn('date').withTitle('생성일시').withOption('width', '160px'),
        DTColumnBuilder.newColumn('rulename').withTitle('규칙명').withOption('width', '100px'),
        DTColumnBuilder.newColumn('constructor').withTitle('생성자').withOption('width', '60px'),
        DTColumnBuilder.newColumn('manager').withTitle('담당자').withOption('width', '60px'),
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

    vm.tagSearch = function (e) {
        $scope.vm.query = e
    }

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


    $scope.date = {startDate: "2016-11-24T07:23:27.725Z", endDate: "2016-11-25T07:23:27.726Z" }

    $scope.opts = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "검색",
            fromLabel: "From",
            format: "YYYY-MM-DD",
            toLabel: "To",
            cancelLabel: '초기화',
            customRangeLabel: '직접선택'
        },
        ranges: {
            '오늘': [moment(), moment()],
            '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '지난 7일': [moment().subtract(6, 'days'), moment()],
            '지난 30일': [moment().subtract(29, 'days'), moment()],
            '이번달': [moment().startOf('month'), moment().endOf('month')],
            '지난달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
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