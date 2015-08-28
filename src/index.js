/**
 * Created by dx.yang on 15/3/31.
 */

angular.module('kai', [
	'chieffancypants.loadingBar',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'highcharts-ng',
    'ui.select'
]).config(function(cfpLoadingBarProvider) {
    //true is the default, but I left this here as an example:
    cfpLoadingBarProvider.includeSpinner = true;
});
