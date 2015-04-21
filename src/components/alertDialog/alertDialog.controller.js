/**
 * Created by dx.yang on 15/4/9.
 */

angular.module('kai')
    .controller('AlertDialogCtrl', [
        '$scope',
        '$modalInstance',
        'messageDialogOptions',
        function(
            $scope,
            $modalInstance,
            messageDialogOptions
        ) {
            var icons = {
                success: 'fa fa-check-circle text-success',
                info: 'fa fa-info-circle text-info',
                warning: 'fa fa-exclamation-circle text-warning',
                error: 'fa fa-times-circle text-error'
            };

            var config = {
                icon: 'success'
            };

            _.merge(config, messageDialogOptions);

            $scope.type = config.type;
            $scope.title = config.title;
            $scope.content = config.content;
            $scope.icon = icons[config.icon];

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);

