/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kai')
    .controller('kai.TableCtrl', [
        '$scope',
        function(
            $scope
        ) {
            console.log($scope.fields);
        }
    ]);
