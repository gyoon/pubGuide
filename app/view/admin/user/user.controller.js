app
.controller('userCtrl', function($compile, $scope, $http, $timeout, DTOptionsBuilder, DTColumnBuilder) {

    var vm = this;
    var data = [];
    vm.dtInstance = {};
    vm.search = search;
    vm.selected = {};
    vm.selectAll = false;
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
            knoxId : 'tangs' + i,
            name : '홍길동',
            company : 's-core',
            org : '데이터 솔루션 그룹',
            startdate : '2016-11-03 10:00:00',
            enddate : '2016-11-03 10:00:00',
            authority : '',
            group : '김철수'
        })
    }

    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('data', data)
        .withDOM('<"information"i>rt<"bottom"lp>')
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
        .withPaginationType('full_numbers');


    vm.dtColumns = [
        DTColumnBuilder.newColumn('knoxId').withTitle('Knox ID'),
        DTColumnBuilder.newColumn('name').withTitle('이름').withOption('width', '160px'),
        DTColumnBuilder.newColumn('company').withTitle('회사').withOption('width', '100px'),
        DTColumnBuilder.newColumn('org').withTitle('부서명').withOption('width', '160px'),
        DTColumnBuilder.newColumn('startdate').withTitle('생성일시').withOption('width', '170px'),
        DTColumnBuilder.newColumn('enddate').withTitle('최종 접속일시').withOption('width', '170px'),
        DTColumnBuilder.newColumn(null).withTitle('메뉴 권한').notSortable().withOption('width', '100px')
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id] = false;
                return '<div class="authority"><span class="glyphicon glyphicon-dashboard" aria-hidden="true"></span>' +
                    '<span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span>' +
                    '<span class="glyphicon glyphicon-bell" aria-hidden="true"></span>' +
                    '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>' +
                    '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span></div>';
            }),
        DTColumnBuilder.newColumn(null).withTitle('그룹명').notSortable().withOption('width', '100px')
            .renderWith(function(data, type, full, meta) {
                vm.selected[full.id] = false;
                $scope.states01 = [
                    {id: 1, title: '관리자'},
                    {id: 2, title: '기본그룹'},
                    {id: 3, title: '권한 A'}
                ];
                return '<select chosen ng-model="state" ng-options="s.id as s.title for s in states01" disable-search="true"></select>';
            })
    ];

    function search(query, dtInstance) {
        dtInstance.DataTable.search(query);
        dtInstance.DataTable.draw();
    }
})
