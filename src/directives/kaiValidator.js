/**
 * Created by dx.yang on 15/4/29.
 */

angular.module('kai').directive('kaiValidator', function() {
    var INTEGER_REGEXP = /^\-?\d+$/;
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {

            ctrl.$validators.required = function(modelValue, viewValue) {
                if (ctrl.$untouched) {
                    return;
                }
                return !ctrl.$isEmpty(modelValue);
            };

            ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return
                }
                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    return true;
                }
                // it is invalid
                return false;
            };

        }
    };
});
