/**
 * Created by dx.yang on 15/3/31.
 */

angular.module('kai')
    .directive('kaiNavbar', function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
            },
            templateUrl: 'components/navbar/navbar.html',
            controller: 'kai.NavbarCtrl'
        };
    });
