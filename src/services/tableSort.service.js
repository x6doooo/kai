/**
 * Created by dx.yang on 15/4/23.
 */

angular.module('kai')
    .service('tableSortService', [
        function() {
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
                        return a[key].localeCompare(b[key]) * t;
                    };
                }
                if (th.sort === 'number') {
                    sortFunc = function(a, b) {
                        return (a[key] - b[key]) * t;
                    };
                }
                if (th.sort === 'array') {
                    sortFunc = function(a, b) {
                        return (a[key].length - b[key].length) * t;
                    };
                }
                scope[whichScopeKeyToBeSort].sort(sortFunc);
            };
        }
    ]);
