/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kai')
    .service('tableSortService', [
        'utilsService',
        function(
            utilsService
        ) {
            var self = this;
            self.sort = function(th, scope, whichScopeKeyToBeSort) {
                if (!th.sort) {
                    return false;
                }
                var key = scope.sortKey = th.key;
                scope.sortType = {
                    desc: 'asc',
                    asc: 'desc'
                }[scope.sortType||'asc'];
                var t = {
                    desc: -1,
                    asc: 1
                }[scope.sortType];

                var sortFunc;
                if (th.sort === 'string') {
                    sortFunc = function(a, b) {
                        a = utilsService.getObjectValueByKeyChain(a, key);
                        b = utilsService.getObjectValueByKeyChain(b, key);
                        //console.log(a, b)
                        if (!a) {
                            return -1 * t;
                        }
                        if (!b) {
                            return t;
                        }
                        return a.localeCompare(b) * t;
                    };
                }
                if (th.sort === 'number') {
                    sortFunc = function(a, b) {
                        a = utilsService.getObjectValueByKeyChain(a, key);
                        b = utilsService.getObjectValueByKeyChain(b, key);
                        return (a - b) * t;
                    };
                }
                if (th.sort === 'array') {
                    sortFunc = function(a, b) {
                        a = utilsService.getObjectValueByKeyChain(a, key);
                        b = utilsService.getObjectValueByKeyChain(b, key);
                        return (a.length - b.length) * t;
                    };
                }
                scope[whichScopeKeyToBeSort].sort(sortFunc);
            };
        }
    ]);
