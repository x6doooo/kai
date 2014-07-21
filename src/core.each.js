(function() {
    function each(obj, iterator, context) {
        var key, len;
        if (Kai.isFunction(obj)) {
            for (key in obj) {
                if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
                    iterator.call(context, key, obj[key]);
                }
            }
            return;
        }
        if (Kai.isArray(obj) || (Kai.isObject(obj) && Kai.isNumber(obj.length))) {
            for (key = 0, len = obj.length; key < len; key++) {
                iterator.call(context, key, obj[key]);
            }
            return;
        } 
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator.call(context, key, obj[key]);
            }
        }
    }
    Kai.each = each;
})();
