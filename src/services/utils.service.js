angular.module('kai')
.service('utilsService', [
    '$parse',
	function(
        $parse
    ) {
		var self = this;
        self.getObjectValueByKeyChain = function(obj, keyChain) {
            var getter = $parse(keyChain);
            return getter(obj);
        };
		self._getObjectValueByKeyChain = function(obj, keyChain) {
            keyChain = keyChain.split('.');
            _.each(keyChain, function(key) {
                if (_.isObject(obj) && typeof obj[key] !== 'undefined') {
                    obj = obj[key];
                } else {
                    obj = undefined;
                }
            });
            return obj;
        };
	}
]);
