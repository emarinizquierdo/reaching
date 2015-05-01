'use strict';

angular.module('app')
    .factory('location', function() {

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

        _location.position = function( p_geoSuccess ){
         
          //.coords.latitude;
          //.coords.longitude;
          navigator.geolocation.watchPosition(p_geoSuccess, geoError, geoOptions);

        };

        return _location;
    });
