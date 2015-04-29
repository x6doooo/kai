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
            $scope.fields = [{
                type: 'text',
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
                }]
            }, {
                type: 'radio',
                key: 'work',
                title: '职业',
                disabled: 'username.',
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
