'use strict';

angular.module('app')
    .controller('emmiterCtrl', function($scope, $http, $timeout, Auth, socket, location, HotFriends) {


        $scope.info = {};
        var friends = [];
        var _me = Auth.getCurrentUser()

        var beacon = function() {

            location.position(function(p_position) {
                console.log('emiting');
                $scope.info.latitude = p_position.coords.latitude;
                $scope.info.longitude = p_position.coords.longitude;
                _emmitForEach(friends);
                $timeout(beacon, 5000);
            });

        };

        var _emmitForEach = function(p_friends) {
            angular.forEach(HotFriends.list, function(p_friend) {
                $scope.info.email = _me.email;
                socket.emit(p_friend.email, _me.email, $scope.info);
            });
        }


        beacon();


    });
