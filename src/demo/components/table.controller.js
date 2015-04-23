/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kaiDemo').controller('TableDemoCtrl', [
    '$scope',
    function(
        $scope
    ) {
        $scope.init = function() {
            $scope.options = {
                //checkbox
                //button
                //search
            };
            $scope.fields = [{
                key: 'country',
                title: '国家',
                sort: 'string'
            }, {
                key: 'city',
                title: '城市',
                sort: 'string'
            }, {
                key: 'code',
                title: '标识数字',
                sort: 'number'
            }, {
                key: 'keywords',
                title: '关键词'
            }];
            $scope.rows = [{
                country: '中国',
                city: '北京',
                code: 1,
                desc: '首都'
            }, {
                country: '美国',
                city: '纽约',
                code: 2,
                desc: '曼哈顿'
            }, {
                country: '澳大利亚',
                city: '悉尼',
                code: 3,
                desc: '新南威尔士州'
            }, {
                country: '法国',
                city: '巴黎',
                code: 4
            }];
        };
    }
]);
