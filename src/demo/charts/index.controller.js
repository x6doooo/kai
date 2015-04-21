/**
 * Created by dx.yang on 15/4/19.
 */

angular.module('kaiDemo')
    .controller('ChartIndexCtrl', [
        '$scope',
        '$routeParams',
        function(
            $scope,
            $routeParams
        ) {
            $scope.siderNavList = [{
                key: 'style',
                title: 'style',
                icon: 'fa fa-file-code-o',
                url: '/#/charts/style'
            }, {
                key: 'form',
                title: 'form',
                icon: 'fa fa-file',
                url: '/#/charts/form'
            }, {
                key: 'dialog',
                title: 'dialog',
                icon: 'fa fa-comment',
                url: '/#/charts/dialog'
            }];

            function getTemplate(which) {
                return 'demo/charts/' + which + '.html';
            }

            function changeRoute() {
                $scope.view = getTemplate($routeParams.which);
            }

            $scope.$on('$routeChangeStart', function() {
                changeRoute();
            });
            changeRoute();

        }
    ]);
