'use strict';

angular.module('reachingApp')
    .controller('LktmeCtrl', function($scope, $routeParams, $http, $location, $timeout, socket, location, gmap) {


        var _routeID = ($routeParams.id) ? $routeParams.id : null;
        var _travelMode = ($routeParams.travelMode && $routeParams.travelMode == 'walking') ? 'walking' : 'driving';
        $scope.route;
        $scope.myPosition = {};

        var car, house;

        var init = function(p_callback) {

            beacon();

            socket.listen( _routeID, function(p_route) {

                $scope.route = p_route;

                calcRoute();

                if (!$scope.$$phase) {
                    $scope.$apply();
                }

            });

            $scope.$on('$destroy', function() {
                socket.unsyncUpdates(_routeID);
            });

        };


        var beacon = function() {

            location.position(function(p_position) {
                $scope.myPosition.latitude = (p_position && p_position.coords && p_position.coords.latitude) ? p_position.coords.latitude : null;
                $scope.myPosition.longitude = (p_position && p_position.coords && p_position.coords.longitude) ? p_position.coords.longitude : null;
                calcRoute();
                $timeout(beacon,10000);
            });

        };

        var calcRoute = function() {

            gmap.route($scope.route.latitude, $scope.route.longitude, $scope.myPosition.latitude, $scope.myPosition.longitude, function(results) {
                if (results && results.routes && results.routes[0] && results.routes[0].legs &&
                    results.routes[0].legs[0]) {
                    $scope.distance = results.routes[0].legs[0].distance.text;
                    $scope.time = results.routes[0].legs[0].duration.text;
                }
            }, _travelMode);

        };

        gmap.initialize('map-canvas', init);

    });
