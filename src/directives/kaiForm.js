/**
 * Created by dx.yang on 15/4/28.
 */


angular.module('kai')
    .directive('kaiForm', function() {
        return {
            restrict: 'A',
            scope: {
                formName: '=',
                model: '=',
                options: '=',
                fields: '='
            },
            templateUrl: 'components/form/form.html',
            controller: 'kai.FormCtrl'
        };
    });
