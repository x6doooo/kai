/**
 * Created by dx.yang on 15/3/31.
 */

angular.module('kai')
    .directive('kaiNavbar', function() {
        return {
            restrict: 'E',
            replace: true,
            //transclude: true,
            scope: {
            },
            templateUrl: 'components/navbar/navbar.html',
            controller: 'kai.NavbarCtrl'
        };
    });
