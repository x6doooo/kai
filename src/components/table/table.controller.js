/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kai')
    .controller('kai.TableCtrl', [
        '$scope',
        'tableSortService',
        function(
            $scope,
            tableSortService
        ) {

            //console.log($scope.options);
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
