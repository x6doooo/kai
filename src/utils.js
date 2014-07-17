(function() {

    var utils = Kai.utils = {};

    var a = 0;
    var b = 0;
    var limit = 65535;

    utils.uniqID = function(key) {
        key = key || '';
        if (b++ == 65535) {
            b = 0;
            a += 1;
        }
        return key + '-' + a + '-' + b;
    };
})();
