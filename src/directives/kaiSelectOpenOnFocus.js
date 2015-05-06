/**
 * Created by dx.yang on 15/5/5.
 */

angular.module('kai').directive('kaiSelectOpenToSelected', function() {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.$watch('$select.open', function(isOpen) {
                //console.log(arguments)
                if (!isOpen) {
                    return;
                }
                // Todo: 根据位置，算出scrollTop 自动滚动到位置

                // 这一层是滚动条所在的div
                //ui-select-choices-content selectize-dropdown-content
                console.log(scope.$select.ngModel.$viewValue);
                console.log(element);
            });
        }
    };
});
