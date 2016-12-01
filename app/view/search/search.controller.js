app.controller('searchCtrl', function($compile, $scope, $uibModal, $http, $timeout, DTOptionsBuilder, DTColumnBuilder) {

    var vm = this;
    var data = [];
    vm.dtInstance = {};
    vm.search = search;
    vm.selected = {};
    vm.selectAll = false;
    vm.toggleAll = toggleAll;
    vm.toggleOne = toggleOne;
    vm.animationsEnabled = true;

    $scope.anicheck = false;

    $timeout(function() {
        $scope.anicheck = true;
    }, 50);

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
            sandbox : '1/4',
            startdate : '2016-11-03 10:00:00',
            enddate : '2016-11-03 10:00:00',
            inflow : '1001',
            usernum : '30',
            size : '15k'
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
        .withOption('order', [0, 'desc'])
        .withPaginationType('full_numbers')
        .withButtons([
            {
                text: '내보내기',
                key: '1',
                action: function (e, dt, node, config) {
                    alert('Button activated');
                }
            }
        ]);

    vm.dtColumns = [
        DTColumnBuilder.newColumn('file').withTitle('파일')
            .renderWith(function(data, type, full, meta) {
                $scope.tagData = 'tag';
                return '<a href="javascript:;" ng-click="vm.modalDetail()">' + data + '</a><br> <span class="label label-warning isClick" ng-click="vm.tagSearch(tagData)">{{tagData}}</span>';
            }),
        DTColumnBuilder.newColumn('sandbox').withTitle('sandbox 진단').withOption('width', '100px'),
        DTColumnBuilder.newColumn('startdate').withTitle('최초 유입일시').withOption('width', '160px'),
        DTColumnBuilder.newColumn('enddate').withTitle('마지막 유입일시').withOption('width', '160px'),
        DTColumnBuilder.newColumn('inflow').withTitle('유입건수').withOption('width', '70px'),
        DTColumnBuilder.newColumn('usernum').withTitle('유입고객수').withOption('width', '70px'),
        DTColumnBuilder.newColumn('size').withTitle('파일크기').withOption('width', '70px'),
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

    vm.modalSave = function (size) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modaldelete.html',
            controller: function ($uibModalInstance) {
                var vm = this;
                vm.save = function () {
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

    vm.modalSearch = function (size) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modalsearch.html',
            controller: function ($uibModalInstance) {
                var vm = this;
                vm.ok = function () {
                    $uibModalInstance.close();
                };
            },
            controllerAs: 'vm',
            size: size,
            resolve: {

            }
        });
    };

    vm.modalDetail = function (size) {
        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'modalDetail.html',
            controller: function ($uibModalInstance) {
                var vm = this;
                vm.ok = function () {
                    $uibModalInstance.close();
                };
                vm.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: 'vm',
            size: 'lg',
            resolve: {

            }
        });
    };


    $scope.anicheck = false;

    $scope.alerts = [];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: '저장되었습니다.  저장한 필터는 내 필터 에서 확인하실 수 있습니다. '});
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


    $scope.filterTemplate = {
        isOpen: false,
        templateUrl: 'filterTemplate.html'
    };

    $scope.filterData = [];

    for (var i = 0 ; i<50 ; i ++) {
        $scope.filterData.push({
            filterValue : '필터명' + i
        })
    }

    $scope.searchTemplate = {
        isOpen: false,
        templateUrl: 'searchTemplate.html'
    };

    $scope.states01 = [
        {id: 1, title: '삼성물산'},
        {id: 2, title: '안랩'},
        {id: 3, title: '삼성화재'},
        {id: 4, title: '삼성sds'},
        {id: 5, title: '등등'}
    ];

    $scope.tagdata = [
        {
            key: "키워드",
            value: "abc"
        },
        {
            key: "키워드",
            value: "abc"
        },
        {
            key: "기간",
            value: "20161120~20161129"
        },
        {
            key: "파일명",
            value: "download"
        },
        {
            key: "파일타입",
            value: "pdf"
        },
        {
            key: "다운로드 유입건수",
            value: "20이상"
        },
        {
            key: "고객사",
            value: "삼성물산"
        },
        {
            key: "Sandbox 탐지여부",
            value: "1이상, FIREEVE MAS"
        },
        {
            key: "파일사이즈",
            value: "10KB~25MB"
        }
    ];
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
})
.directive('tagList', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            tags: "=tagdata"
        },
        link: function (scope, element, attribute) {

            scope.tagRemove = function(e) {
                angular.element(e.target.parentNode).addClass('remove')
                $timeout(function() {
                    angular.element(e.target.parentNode).remove()
                }, 400);
            };

        },
        template: '<div class="kdb-tagList">' +
        '<div class="title">{{tags.key}}</div>' +
        '<div class="value">{{tags.value}}</div>' +
        '<span ng-click="tagRemove($event)" class="isClick glyphicon glyphicon-remove" aria-hidden="true"></span>' +
        '</div>',
        replace: true
    };
})