app
.controller('ruleAddCtrl', function($scope, $http) {

    $scope.isModeToggle = false;
    $scope.modeToggleButton = function() {
        $scope.isModeToggle = !$scope.isModeToggle;
    }

    $scope.states01 = [
        {id: 1, title: '안랩'},
        {id: 2, title: 'SECUI'},
        {id: 3, title: 'FIREEYE'},
        {id: 4, title: '등등'},
        {id: 5, title: '안랩'},
        {id: 6, title: 'SECUI'},
        {id: 7, title: 'FIREEYE'},
        {id: 8, title: '등등'}
    ];

    $scope.states02 = [
        {id: 1, title: '경유지 평판'},
        {id: 2, title: '유포지 평판'},
        {id: 3, title: 'FIREEYE'},
        {id: 4, title: '샌드박스'},
        {id: 5, title: '안랩'},
        {id: 6, title: 'SECUI'},
        {id: 7, title: 'FIREEYE'},
        {id: 8, title: '등등'}
    ];

    $scope.states03 = [
        {id: 1, title: 'contains'},
        {id: 2, title: 'begins'},
        {id: 3, title: 'ends'},
        {id: 4, title: 'in'},
        {id: 5, title: 'contains'},
        {id: 6, title: 'contains'},
        {id: 7, title: 'ends'},
        {id: 8, title: 'in'}
    ];

    $scope.states04 = [
        {id: 1, title: 'AND'},
        {id: 2, title: 'OR'}
    ];

    $scope.states05 = [
        {id: 1, title: '홍길동'},
        {id: 2, title: '홍길동2'},
        {id: 3, title: '홍길동3'},
        {id: 4, title: '홍길동4'},
        {id: 5, title: '홍길동5'},
        {id: 6, title: '홍길동6'}
    ];


    $scope.items = [];
    $scope.itemsToAdd = [];

    $scope.add = function(itemToAdd) {
        var index = $scope.itemsToAdd.indexOf(itemToAdd);
        $scope.itemsToAdd.splice(index, 1);
        $scope.items.push(angular.copy(itemToAdd))
    };

    $scope.addNew = function() {
        $scope.itemsToAdd.push({
            firstName: '',
            lastName: ''
        })
    }

})
