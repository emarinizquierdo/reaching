'use strict';

angular.module('app')
    .controller('emmiterCtrl', function($scope, $http, $timeout, Auth, socket, location, Friend) {


        var _routeID = "testtoken";

        $scope.route = {};
        var friends = [];

        var beacon = function() {

            location.position(function(p_position) {
                console.log('emiting');
                $scope.route.latitude = p_position.coords.latitude;
                $scope.route.longitude = p_position.coords.longitude;
                _emmitForEach(friends);
                $timeout(beacon, 5000);
            });

        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates($scope.route);
        });


        var _LoadFriends = function() {
            Friend.get(null, function(data) {
                friends = data;
                beacon();
            }, function(data) {

            })
        }

        var _emmitForEach = function(p_friends) {
            angular.forEach(p_friends, function(p_friend) {
                var _me = Auth.getCurrentUser()
                if (_me.google && _me.google.etag && p_friend && p_friend.userInfo && p_friend.userInfo.google && p_friend.userInfo.google.etag) {
                    var _key = _me.google.etag.replace(/\"/g, "") + ":" + p_friend.userInfo.google.etag.replace(/\"/g, "");
                    $scope.route.emitKey = _key;
                    socket.emit($scope.route);
                }

            })
        }

        
        _LoadFriends();


    });
