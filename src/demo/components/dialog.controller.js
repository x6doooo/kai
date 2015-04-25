/**
 * Created by dx.yang on 15/4/10.
 */

angular.module('kaiDemo')
    .controller('DialogDemoCtrl', [
        '$scope',
        'dialogService',
        function(
            $scope,
            dialogService
        ) {
            // alert
            $scope.messageText = 'this is a test!this is a test!';
            $scope.alert = function() {
                dialogService.alert({
                    content: $scope.messageText
                }).done(function() {
                    alert('close');
                });
            };

            // prompt
            $scope.promptText = 'are you sure?';
            $scope.prompt = function() {
                dialogService.prompt({
                    content: $scope.promptText
                }).done(function() {
                    alert('ok');
                }).fail(function() {
                    alert('cancel');
                });
            };

        }
    ]);
