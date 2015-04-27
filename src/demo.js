angular.module('kaiDemo', [
        'kai'
    ])
    .constant('kai.mainNavList', [{
        key: 'home',
        title: 'Home',
        icon: 'fa fa-home',
        url: '/#/home'
    }, {
        key: 'charts',
        title: 'Charts',
        icon: 'fa fa-area-chart',
        url: '/#/charts/base'
    }, {
        key: 'components',
        title: 'components',
        icon: 'fa fa-subway',
        url: '/#/components/table'
    }])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'demo/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/charts/:which', {
                templateUrl: 'demo/charts/index.html',
                controller: 'ChartIndexCtrl'
            })
            .when('/components/:which', {
                templateUrl: 'demo/components/index.html',
                controller: 'DemoComponentsCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
