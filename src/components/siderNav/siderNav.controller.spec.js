/**
 * Created by dx.yang on 15/4/14.
 */

describe('siderNavController', function() {
    var scope;
    var $routeParams;

    beforeEach(module('kai'));
    beforeEach(inject(function($rootScope, $controller, _$routeParams_) {
        scope = $rootScope.$new();
        $routeParams = _$routeParams_;
        $controller('kai.SiderNavCtrl', {
            $scope: scope,
            $routeParams: $routeParams
        });
        scope.$digest();
    }));

    it('route change', inject(function($rootScope) {

        $routeParams.which = 'a';
        $rootScope.$broadcast('$routeChangeStart');
        expect(scope.currentTab).toEqual($routeParams.which);

        $routeParams.which = 'b';
        $rootScope.$broadcast('$routeChangeStart');
        expect(scope.currentTab).toEqual($routeParams.which);

    }));
});
