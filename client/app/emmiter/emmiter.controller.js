'use strict';

angular.module('reachingApp')
    .controller('EmmiterCtrl', function($scope, $routeParams, $http, $location, $timeout, socket, location) {


        var _routeID = ($routeParams.id) ? $routeParams.id : null;

        $scope.route;


        var init = function(p_callback) {
            $http.get('/api/things/' + _routeID).success(function(p_route) {
                if (p_route) {
                    $scope.route = p_route;
                    p_callback();
                } else {
                    $location.path("/");
                }
            }).error(function() {
                $location.path("/");
            });
        };

        var beacon = function() {

            location.position(function(p_position) {
            	console.log('emiting');
                $scope.route.latitude = p_position.coords.latitude;
                $scope.route.longitude = p_position.coords.longitude;
                socket.emit($scope.route);
                $timeout(beacon, 5000);
            });

        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates($scope.route._id);
        });

        init(beacon);


    });
