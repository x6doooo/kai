/**
 * Created by dx.yang on 15/4/4.
 */


angular.module('kai')
    .directive('kaiSiderNav', function() {
        return {
            restrict: 'E',
            scope: {
                list: '=list'
            },
            templateUrl: 'components/siderNav/siderNav.html',
            controller: 'kai.SiderNavCtrl'
        };
    });
