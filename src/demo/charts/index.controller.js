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
                key: 'base',
                title: 'base',
                icon: 'fa fa-file-code-o',
                url: '/#/charts/base'
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
