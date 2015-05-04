/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kai')
    .controller('kai.TableCtrl', [
        '$scope',
        'tableSortService',
        'utilsService',
        '$filter',
        function(
            $scope,
            tableSortService,
            utilsService,
            $filter
        ) {

            $scope.$watch('rows', function(newRows) {
                $scope.init();
            });

            function getRowsAtCurrentPage() {
                var start = $scope.options.pagination.itemsPerPage * ($scope.options.pagination.current - 1);
                var end = start + $scope.options.pagination.itemsPerPage;
                if (end > $scope.options.pagination.totalItems) {
                    end = $scope.options.pagination.totalItems;
                }
                $scope.theRows = $scope.filtedRows.slice(start, end);
            }

            $scope.filterKeyWords = function() {
                var w = $scope.searchFilter;
                var find = $filter('filter');
                $scope.filtedRows = find($scope.rows, w);
                $scope.options.pagination.totalItems = $scope.filtedRows.length;
                getRowsAtCurrentPage();
            };

            $scope.init = function() {

                // init
                $scope.options = $scope.options || {};

                $scope.filtedRows = [];

                // pagination
                $scope.options.pagination = $scope.options.pagination || {};
                var paginationKeys = {
                    totalItems: $scope.filtedRows.length,
                    maxSize: 5,
                    itemsPerPage: 2,
                    boundaryLinks: true,
                    rotate: false,
                    previousText: '上一页',
                    nextText: '下一页',
                    firstText: '首页',
                    lastText: '尾页',
                    //numberPerPage: 1,
                    //totalRows: 1,
                    action: function() {
                        getRowsAtCurrentPage();
                    }
                };
                _.each(paginationKeys, function(defaultValue, key) {
                    if (typeof $scope.options.pagination[key] === 'undefined') {
                        $scope.options.pagination[key] = defaultValue;
                    }
                });
                //console.log($scope.options.pagination);
                // filte
                $scope.filterKeyWords();
            };

            $scope.valueOfKey = function(obj, key) {
                var v = utilsService.getObjectValueByKeyChain(obj, key);
                if (v === 0) {
                    v = '0';
                }
                return v;
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
                tableSortService.sort(field, $scope, 'filtedRows');
                getRowsAtCurrentPage();
            };

        }
    ]);
