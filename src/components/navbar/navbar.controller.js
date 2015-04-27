angular.module('kai')
    .controller('kai.NavbarCtrl', [
        '$scope',
        '$location',
        'kai.mainNavList',
        'kai.mainNavTitle',
        function (
            $scope,
            $location,
            mainNavList,
            mainNavTitle
        ) {
            $scope.list = mainNavList;
            $scope.title = mainNavTitle;
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
