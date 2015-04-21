angular.module('kai')
    .controller('kai.NavbarCtrl', [
        '$scope',
        '$location',
        'kai.mainNavList',
        function (
            $scope,
            $location,
            mainNavList
        ) {
            $scope.list = mainNavList;
            function changeTab() {
                var p = $location.path();
                if (!p) {
                    return;
                }
                p = p.match(/^\/([^/]+)/)[1];
                $scope.currentTab = p;
            }

            $scope.$on('$routeChangeStart', function () {
                changeTab();
            });
            changeTab();
        }]);
