angular.module('kai')
.service('utilsService', [
	function() {
		var self = this;
		self.getObjectValueByKeyChain = function(obj, keyChain) {
            keyChain = keyChain.split('.');
            _.each(keyChain, function(key) {
                if (_.isObject(obj) && obj[key]) {
                    obj = obj[key];
                } else {
                    obj = undefined;
                }
            });
            return obj;
        };
	}
]);