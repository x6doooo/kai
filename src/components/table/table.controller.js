/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kai')
    .controller('kai.TableCtrl', [
        '$scope',
        'tableSortService',
        'utilsService',
        function(
            $scope,
            tableSortService,
            utilsService
        ) {

            $scope.init = function() {

                // init
                $scope.options = $scope.options || {};

                // pagination
                $scope.options.pagination = $scope.options.pagination || {};
                var paginationKeys = {
                    totalItems: 1,
                    maxSize: 5,
                    itemsPerPage: 20,
                    boundaryLinks: true,
                    rotate: false,
                    previousText: '上一页',
                    nextText: '下一页',
                    firstText: '首页',
                    lastText: '尾页',
                    numberPerPage: 1,
                    totalRows: 1,
                    action: function() {}
                };
                _.each(paginationKeys, function(defaultValue, key) {
                    if (typeof $scope.options.pagination[key] === 'undefined') {
                        $scope.options.pagination[key] = defaultValue;
                    }
                });
            };

            $scope.valueOfKey = function(obj, key) {
                return utilsService.getObjectValueByKeyChain(obj, key);
            };


            $scope.checkboxHandler = function(row) {
                if (!row) {
                    _.each($scope.rows, function(r) {
                        r.checked = $scope.allChecked;
                    });
                } else {
                    var allChecked = true;
                    _.each($scope.rows, function(r) {
                        if (!r.checked) {
                            allChecked = false;
                        }
                    });
                    $scope.allChecked = allChecked;
                }
            };

            $scope.sort = function(field) {
                tableSortService.sort(field, $scope, 'rows');
            };

        }
    ]);
