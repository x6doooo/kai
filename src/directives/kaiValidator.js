/**
 * Created by dx.yang on 15/4/29.
 */

angular.module('kai').directive('kaiValidator', function() {

    var hash = {
        regexp: function(ctrl, exp) {
            return function(modelValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                return exp.test(modelValue);
            };
        }
    };

    return {
        require: 'ngModel',
        scope: {
            'kaiValidator': '='
        },
        link: function(scope, elem, attrs, ctrl) {
            _.each(scope.kaiValidator, function(v) {
                var checkFn = hash[v.type] ? hash[v.type](ctrl, v.value) : null;
                ctrl.$parsers.unshift(function(val) {
                    if (checkFn) {
                        var isSuccess = checkFn(val);
                        if (isSuccess) {
                            ctrl.$setValidity(v.type, true);
                        } else {
                            ctrl.$setValidity(v.type, false);
                        }
                    }
                    return val;
                });

            });
        }
    };
});
