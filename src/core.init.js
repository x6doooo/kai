var Kai = function(obj) {
    return Kai.init(obj);
};

Kai.init = function(obj) {
    var type = Kai.type(obj);
    return new Kai[type](obj);
};

