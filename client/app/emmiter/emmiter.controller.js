'use strict';

angular.module('reachingApp')
    .controller('EmmiterCtrl', function($scope, $routeParams, $http, $location, socket) {


        var _routeID = ($routeParams.id) ? $routeParams.id : null;


        var init = function() {
            $http.get('/api/things/' + _routeID).success(function(p_route) {
                if (p_route) {
                    $scope.p_route = p_route;
                    socket.syncUpdates('thing', $scope.p_route);
                } else {
                    $location.path("/");
                }
            }).error(function() {
                $location.path("/");
            });
        };

        init();


    });
