/**
 * Created by dx.yang on 15/4/5.
 */

angular.module('kai')
    .controller('kai.SiderNavCtrl', [
        '$scope',
        '$location',
        '$routeParams',
        function(
            $scope,
            $location,
            $routeParams
        ) {
            $scope.init = function() {
                //console.log($scope.list);
            };
            function changeTab() {
                $scope.currentTab = $routeParams.which;
            }
            $scope.$on('$routeChangeStart', function () {
                changeTab();
            });
            changeTab();
        }
    ]);
