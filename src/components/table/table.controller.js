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
            //console.log($scope.fields);
            $scope.sort = function(field) {
                tableSortService.sort(field, $scope, 'rows');
            };
        }
    ]);
