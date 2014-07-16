var Kai = {};

(function() {
    /*
     * @Usage:
     * |  //创建父类
     * |  Dad = new Class;
     * |
     * |  Dad.extend({
     * |    say: function(){...}  //类方法
     * |  });
     * |
     * |  Dad.include({
     * |    init: function(){...} //init方法会在创建实例时自动调用
     * |    look: function(){...} //原型方法
     * |  });
     * |
     * |  //创建子类，子类继承父类
     * |  Son = new Class(Dad);
     * |
     * |  Son.inlcude({
     * |    look: function(){ //覆盖父类的方法
     * |      this._super();  //调用父类的同名方法 和其他语言的super功能相似
     * |      ...
     * |    }
     * |  });
     * |
     * |  tom = new Son;  //创建实例
     */

    var Class = function(parent) {
        var _class = function() {
            this.init.apply(this, arguments);
        },
        key,
        subclass;
        _class.prototype.init = function() {};
        if (parent) {
            subclass = function() {};
            subclass.prototype = parent.prototype;
            _class.uber = parent.prototype;
            _class.prototype = new subclass;
        }
        _class.extend = function(obj) {
            for (key in obj) {
                _class[key] = obj[key];
            }
        };
        _class.include = function(obj) {
            for (key in obj) {
                _class.prototype[key] = obj[key];
                if (_class.uber && isFunction(_class.uber[key])) {
                    obj[key].spfunc = _class.uber[key];
                }
            }
        };
        _class.prototype.get = function(k) {
            return this[k];
        };
        _class.prototype.set = function(k, v) {
            this[k] = v;
            return this;
        };
        _class.prototype._super = function() {
            arguments.callee.caller.spfunc.apply(this, arguments);
        };
        return _class;
    };

    Kai.Class = Class;
 
})();
 
 
