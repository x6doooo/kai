(function() {

    function isEmptyObj(obj) {
        for (var key in obj) {
            return true;
        }
        return false;
    }
    
    function type(obj) {
        return Object.prototype.toString.call(obj).replace(/(\[object\s)|(\])/g, '');
    }

    var types = [
        'Function', 
        'Object', 
        'Undefined', 
        'Array', 
        'Date', 
        'Number',
        'Null',
        'RegExp'
    ];

    var t;
    for (var i = 0, len = types.length; i < len; i++) {
        t = types[i];
        Kai['is' + t] = function(obj) {
            return type(obj) === t;
        };
    }
    
    Kai.type = type;
    Kai.isEmptyObj = isEmptyObj;
})();
