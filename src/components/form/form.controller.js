/**
 * Created by dx.yang on 15/4/28.
 */

angular.module('kai')
.controller('kai.FormCtrl', [
    '$scope',
    function(
        $scope
    ) {
        $scope.formModel = {};
        $scope.fields = [{
            type: 'string',
            key: 'username',
            title: '用户名',
            required: true,
            disabled: false,
            tip: '',
            validators: [{
                type: 'regexp',
                value: /\a/,
                tip: ''
            }, {
                type: 'min',
                value: 10,
                tip: ''
            }, {
                type: 'minLen',
                value: 10,
                tip: ''
            }, {
                type: 'required',
                tip: ''
            }]
        }, {
            type: 'radio',
            key: 'work',
            title: '职业',
            disabled: 'username.',
            options: [{
                value: '',
                title: ''
            }]
        }];
    }
]);
