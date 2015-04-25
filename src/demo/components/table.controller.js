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
                search: true,
                checkbox: true,
                topButtons: [{
                    className: 'btn btn-primary btn-sm',
                    icon: 'fa fa-edit',
                    title: 'Edit',
                    action: function(row) {
                        console.log(row)
                    }
                }, {
                    className: 'btn btn-danger btn-sm',
                    icon: 'fa fa-trash',
                    title: 'Del',
                    action: function (row) {
                        console.log(row)
                    }
                }],
                buttons: [{
                    className: 'text-primary',
                    icon: 'fa fa-edit',
                    title: 'Edit',
                    action: function(row) {
                        console.log(row)
                    }
                }, {
                    className: 'text-danger',
                    icon: 'fa fa-trash',
                    title: 'Del',
                    action: function(row) {
                        console.log(row)
                    }
                }]
            };
            $scope.fields = [{
                key: 'country',
                title: '国家',
                sort: 'string',
                valueHandler: function(value) {
                    if (value === '美国') {
                        return '<span style="color:#08c">' + value + '</span>';
                    } else {
                        return '<b>' + value + '</b>';
                    }
                }
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
                keywords: '首都'
            }, {
                country: '美国',
                city: '纽约',
                code: 2,
                keywords: '曼哈顿'
            }, {
                country: '澳大利亚',
                city: '悉尼',
                code: 3,
                keywords: '新南威尔士州'
            }, {
                country: '法国',
                city: '巴黎',
                code: 4
            }];
        };
    }
]);
