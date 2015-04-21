/**
 * Created by dx.yang on 15/4/10.
 */

angular.module('kaiDemo')
    .controller('DialogDemoCtrl', [
        '$scope',
        'dialogService',
        '$window',
        function(
            $scope,
            dialogService,
            $window
        ) {
            // alert
            $scope.messageText = 'this is a test!this is a test!';
            $scope.alert = function() {
                dialogService.alert({
                    content: $scope.messageText
                }).done(function() {
                    $window.alert('close');
                });
            };

            // prompt
            $scope.promptText = 'are you sure?';
            $scope.prompt = function() {
                dialogService.prompt({
                    content: $scope.promptText
                }).done(function() {
                    $window.alert('ok');
                }).fail(function() {
                    $window.alert('cancel');
                });
            };

        }
    ]);
