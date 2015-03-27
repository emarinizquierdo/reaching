'use strict';

angular.module('reachingApp')
    .factory('gmap', function($rootScope, $timeout) {

        // Main Object
        var _map = {};

        /*
         * Common and private vars
         */

        //Madrid
        var madrid = new google.maps.LatLng(40.4378271, -3.6795366);

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOptions = {
            zoom: 14,
            center: madrid,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        //Google Maps Controller
        _map.map = null;

        _map.travelMode = google.maps.TravelMode.WALKING;

        _map.initialize = function(p_selector, p_callback) {

            _map.map = new google.maps.Map(document.getElementById(p_selector), mapOptions);
            directionsDisplay.setMap(_map.map);
            directionsDisplay.setOptions( { suppressMarkers: true } );

            p_callback();
            secureApply();

        };

        _map.addEventHandler = function(p_event, p_handler) {

            google.maps.event.addListener(p_event, 'directions_changed', function() {
                p_handler(p_event);
            });

        };

        _map.marker = function( p_point, p_lat, p_long, p_type) {

            var iconBase = (p_type == 1) ? 'http://maps.google.com/mapfiles/kml/pal2/icon47.png' : 'http://maps.google.com/mapfiles/kml/pal2/icon10.png';

            if (p_point) point.setMap(null);

            p_point = (!p_point) ? new google.maps.Marker({
                position: new google.maps.LatLng(p_lat, p_long),
                title: 'My position',
                icon: iconBase
            }) : p_point;

            p_point.setMap(_map.map);
            _map.map.setCenter(p_point.getPosition());

            return p_point;
        };

        _map.route = function(o_lat, o_long, d_lat, d_long, p_callback) {

            var start = new google.maps.LatLng(o_lat, o_long);
            var end = new google.maps.LatLng(d_lat, d_long);

            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            };

            directionsService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                    p_callback(result)
                    secureApply();
                }
            });
        };

        _map.show = function(p_object) {
            if (p_object) {
                p_object.setMap(_map.map);
            }
        }

        _map.hide = function(p_object) {
            if (p_object) {
                p_object.setMap(null);
            }
        };

        _map.clickHandler = function() {

        }

        var secureApply = function() {
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        }

        return _map;

    });
