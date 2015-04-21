/**
 * Created by dx.yang on 15/4/10.
 */

angular.module('kai')
    .service('dialogService', [
        '$modal',
        '$q',
        function(
            $modal,
            $q
        ) {
            var self = this;

            function promiseResult() {
                var deferred = $q.defer();
                deferred.promise.done = function(fn) {
                    deferred.promise.then(function(resData) {
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
                return deferred;
            }

            // alert and prompt
            function modelCreate(options) {
                return $modal.open({
                    templateUrl: options.templateUrl || 'components/alertDialog/alertDialog.html',
                    controller: options.controller || 'AlertDialogCtrl',
                    size: options.size || 'sm',
                    resolve: {
                        messageDialogOptions: function() {
                            return options;
                        }
                    }
                });
            }

            self.alert = function(options) {
                options.type = 'alert';
                var modalInstance = modelCreate(options);
                var deferred = promiseResult();
                modalInstance.result.then(function (data) {
                    // close
                    deferred.resolve(data);
                }, function (data) {
                    // dismiss
                    deferred.resolve(data);
                });
                return deferred.promise;
            };

            self.prompt = function(options) {
                options.type = 'prompt';
                var modalInstance = modelCreate(options);
                var deferred = promiseResult();
                modalInstance.result.then(function (data) {
                    // close
                    deferred.resolve(data);
                }, function (data) {
                    // dismiss
                    deferred.reject(data);
                });
                return deferred.promise;
            };

            self.custom = function(options) {
                var modalInstance = modelCreate(options);
                var deferred = promiseResult();
                modalInstance.result.then(function (data) {
                    // close
                    deferred.resolve(data);
                }, function (data) {
                    // dismiss
                    deferred.reject(data);
                });
                return deferred.promise;
            };

        }
    ]);
