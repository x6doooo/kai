/**
 * Created by dx.yang on 15/4/5.
 */

angular.module('kai')
    .directive('kaiTable', function() {
        return {
            restrict: 'A',
            scope: {
                options: '=',
                fields: '=',
                rows: '='
            },
            templateUrl: 'components/table/table.html',
            controller: 'kai.TableCtrl'
        };
    });
