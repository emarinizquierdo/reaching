'use strict';

angular.module('app')
    .controller('emmiterCtrl', function($scope, $http, $timeout, socket, location) {


        var _routeID = "testtoken";

        $scope.route = {};

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
            socket.unsyncUpdates($scope.route);
        });


beacon();


    });
