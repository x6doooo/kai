/**
 * Created by dx.yang on 15/4/12.
 */


angular.module('kaiDemo')
    .controller('FormDemoCtrl', [
        '$scope',
        function(
            $scope
        ) {

            $scope.formModel = {};
            $scope.formName = 'aTestForm';
            $scope.fields = [{
                type: 'text',
                key: 'username',
                title: '用户名',
                required: true,
                disabled: false,
                tip: '请输入用户名',
                validators: [{
                    type: 'regexp',
                    value: /^[0-9]+$/,
                    tip: '只能是数字'
                }, {
                    type: 'min',
                    value: 10,
                    tip: ''
                }, {
                    type: 'minLen',
                    value: 10,
                    tip: ''
                }]
            }, {
                type: 'radio',
                key: 'work',
                title: '职业',
                disabled: '',
                options: [{
                    value: 'codeFarmer',
                    title: '码农'
                }, {
                    value: 'codeWorker',
                    title: '码工'
                }]
            }];
        }
    ]);
