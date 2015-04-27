(function(window, angular) {

    var limit = 65535;
    function createBaseArray() {
        return [0, 0];
    }
    var cacheNums = {};
    var guid = function(key) {
        var nums = cacheNums[key];
        if (!nums) {
            nums = cacheNums[key] = createBaseArray();
        }
        var idx = 0;
        var len = nums.length;
        while(idx < len) {
            if (++nums[idx] > limit) {
                nums[idx] = 0;
                idx++;
            } else {
                break;
            }
        }
        var id = nums.join('-');
        if (key) {
            id = key + '-' + id;
        }
        return id;
    };

    angular.module('kai').service('$ajax', 
    [
        '$q', '$http', 'cfpLoadingBar', '$sce',
        function($q, $http, cfpLoadingBar) {
        var self = this;
        // 默认设置
        self.defaultConfig = {
            // 超时
            // timeout: false,
            // 允许cache  由$http设置
            // cache: false,
            // 状态描述字段
            codeField: 'code',
            // 成功
            successCode: 0,
            // 内容字段
            contentField: 'data',
            // 错误描述字段
            errorField: 'error'
        };
        // 设置
        self.setConfig = function(cfg) {
            self.config = angular.extend({}, self.defaultConfig, cfg);
        };

        var abortMsgStr = 'angular-ajax-abort-1234567890';

        var allRequest = {};

        /*
            todo: some defer snyc.... 可以把一个when里的ajax都abort掉
            todo: 要区分error和success
            todo: cache write read delete

            todo: test abort
        */

        function _checkDone(count, hasDone, allPromise, data) {
            if (count === hasDone) {
                allPromise.resolve(data);
            }
        }

        self.when = function(/* defer, defer, ... */) {
            var args = Array.prototype.slice.call(arguments, 0);
            var count = args.length;
            var hasDone = 0;
            var results = [];
            var deferred = $q.defer();
            angular.forEach(args, function(v, k) {
                v.done(function(data) {
                    results[k] = {
                        success: true,
                        data: data
                    };
                    hasDone++;
                    _checkDone(count, hasDone, deferred, results);
                }).fail(function(err) {
                    results[k] = {
                        success: false,
                        error: err
                    };
                    hasDone++;
                    _checkDone(count, hasDone, deferred, results);
                });
            });
            deferred.promise.abort = function() {
                angular.forEach(args, function(v) {
                    v.abort();
                });
            };
            return deferred.promise;
        };

        // 取消所有
        self.clearAll = function() {
            angular.forEach(allRequest, function(v) {
                v.abort();
            });
        };

        self.request = function(ajaxConfig, selfConfig) {

            var uid = guid('$ajax');

            cfpLoadingBar.start();

            // 未添加设置，采用默认设置
            if (!self.config) {
                self.setConfig({});
            }
            var cfg = self.config;
            if (selfConfig) {
                cfg = angular.extend({}, self.config, selfConfig);
            }

            var deferred = $q.defer();
            ajaxConfig.timeout = deferred;
            allRequest[uid] = deferred;

            if (ajaxConfig.beforeSend) {
                ajaxConfig.beforeSend();
            }

            $http(ajaxConfig).then(function(res) {
                delete allRequest[uid];
                // 正常返回结果
                if (cfg.codeField !== undefined) {
                    if (res.data[cfg.codeField] === cfg.successCode) {
                        if (cfg.contentField) {
                            deferred.resolve(res.data[cfg.contentField]);
                        } else {
                            deferred.resolve(res.data);
                        }
                        return;
                    }
                } else {
                    if (res.data !== undefined) {
                        deferred.resolve(res.data);
                    }
                }
                // 后端报错
                deferred.reject(res.data[cfg.errorField]);
            },
            function(res) {
                delete allRequest[uid];
                // http错误
                deferred.reject(res.status + ' : ' + res.statusText);
            });

            deferred.promise.done = function(fn) {
                deferred.promise.then(function(resData) {
                    if (resData === abortMsgStr) {
                        return;
                    }
                    fn(resData);
                });
                return deferred.promise;
            };
            deferred.promise.fail = function(fn) {
                deferred.promise.then(null, function(resData) {
                    fn(resData);
                });
                return deferred.promise;
            };
            //取消
            deferred.promise.abort = function() {
                delete allRequest[uid];
                deferred.resolve(abortMsgStr);
            };
            return deferred.promise;
        };  // self.request ]]

        var methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'JSONP', 'JSON'];
        angular.forEach(methods, function(m) {
            var selfConfig;
            self[m.toLowerCase()] = function(url, data, config) {
                switch (m) {
                    case 'JSONP':
                    case 'GET':
                        if (data) {
                            var p = [];
                            angular.forEach(data, function(v, k) {
                                //console.log(k,v)
                                p.push(k + '=' + encodeURIComponent(v));
                            });
                            if (m === 'JSONP') {
                                p.push('callback=JSON_CALLBACK');
                            }
                            p = '?' + p.join('&');
                            url += p;
                            data = null;
                        }
                        break;
                    case 'HEAD':
                    case 'DELETE':
                        if (data) {
                            config = data;
                            data = null;
                        }
                        break;
                    case 'JSON':
                        m = 'GET';
                        selfConfig = {
                            codeField: undefined,
                            successCode: undefined,
                            contentField: undefined,
                            errorField: undefined
                        };
                        break;
                    default:
                        break;
                }
                var obj = {
                    method: m,
                    url: url
                };
                if (data) {
                    obj.data = data;
                }
                if (config) {
                    obj.config = config;
                }
                return this.request(obj, selfConfig);
            };
        });

        /* TODO:
         *
         *  jsonp
         *
         * */

    }]);

})(window, window.angular);

