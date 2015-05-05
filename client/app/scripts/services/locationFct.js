'use strict';

angular.module('app')
    .factory('location', function($rootScope, $location, $q) {

        var _location = {};


        var startPos;
        var geoOptions = {
            enableHighAccuracy: true
        }

        var geoError = function(error) {
            console.log('Error occurred. Error code: ' + error.code);
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
        };

        _location.position = function() {

            var _deferred = $q.defer();

            navigator.geolocation.getCurrentPosition(function(p_data) {
                _deferred.resolve(p_data);
                _secApply();
            }, function(p_error) {
                console.log('Error occurred. Error code: ' + p_error.code);
                _deferred.reject();
                _secApply();
            });

            return _deferred.promise;

        };

        var _secApply = function() {
            if (!$rootScope.$phase) {
                $rootScope.$apply();
            }
        }

        return _location;
    });
