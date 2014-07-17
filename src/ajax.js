(function($) {

    var Class = Kai.Class;
    
    var AjaxConfigClass = new Class;

    AjaxConfigClass.include({
        init: function(config) {
            var self = this;
            var defaultConfig = {
                Prefix: '',
                CodeField: '',
                SuccessCode: '',
                DataField: '',
                ErrorField: ''
            };
            self.config = config ? $.extend(defaultConfig, config) : defaultConfig;
        }
    });

    var defaultAjaxConfig = new AjaxConfigClass;

    // 缓存请求结果
    var ajaxCachePool = {};
    var ajaxController = {
        cache: {},
        set: function(key, rt) {
            this.cache[key] = rt;
        },
        abort: function(key) {
            var c = this.cache;
            if (c[key] && c[key].ajax) {
                c[key].ajax.abort();
                delete c[key];
            }
        },
        abortAll: function() {
            var c = this.cache;
            $.each(c, function(k, v) {
                if (v && v.ajax) {
                    v.ajax.abort();
                    delete c[k];
                }
            });
        }
    };

    var ajax = function(params, config) {
        
        config = config || defaultAjaxConfig;

        var defaultParams = {
            type: 'POST',
            dataType: 'JSON'
        };
        params = $.extend(defaultParams, params);
        
        params.url = config.Prefix + params.url;

        var defer = $.Deferred();

        var cacheKey;
        if (params.data) {
            cacheKey = $.toJSON(params.data);
        } else {
            cacheKey = params.url;
        }

        if (params.useCache && ajaxCachePool[cacheKey]) {
            setTimeout(function() {
                defer.resolveWith(null, [chacePool.cacheKey]);
            }, 0);
            return;
        }

        var ajax = $.ajax(params).done(function(json) {
            
            var returnCode = json[config.CodeField];

            if (returnCode === config.SuccessCode) {
                var data = json[config.DataField];
                defer.resolveWith(ajax, [data]);
                if (params.useCache) {
                    ajaxCachePool[cacheKey] = [data];
                }
                return;
            }
            
            defer.rejectWith(ajax, [returnCode, json[config.ErrorField]]);   

        }).fail(function(xhr, textStatus) {
            if (xhr.status == 200) {
                defer.rejectWith(ajax, [xhr.status, 'JSON解析失败']);
            } else {
                defer.rejectWith(ajax, [xhr.status, xhr.statusText]);
            }
        }).always(function() {
        
        });

        var rt = defer.promise();

        rt.ajax = ajax;

        var uniqID = Kai.utils.uniqID('ajax');

        ajaxController.set(uniqID, rt);

        return rt;

    };

})(jQuery);
