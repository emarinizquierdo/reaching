'use strict';

angular.module('app')
    .factory('commuter', function(Friend, HotFriends, Auth, socket, location) {

        var _commuter = {};
        var _me = Auth.getCurrentUser()

        var _LoadFriends = function() {
            Friend.get(null, function(data) {

                var _i = 0;

                HotFriends.list = {};

                for (_i = 0; _i < data.length; _i++) {
                    HotFriends.list[data[_i].email] = data[_i]
                }

                _addTokenForListenFriend(HotFriends.list);
                beacon();

            }, function(data) {

            })
        }

        var _addTokenForListenFriend = function(p_friends, p_token) {

            angular.forEach(p_friends, function(p_friend) {
                socket.listenPositions(p_friend.email, _me.email, _updateFriend);

            })

        };

        var _updateFriend = function(data) {
            if (HotFriends.list[data.info.email]) {
                HotFriends.list[data.info.email].latitude = data.info.latitude
                HotFriends.list[data.info.email].longitude = data.info.longitude;
            }
        };

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

        var _init = function() {
            _LoadFriends();
        };

        if (_me.$promise) {
            _me.$promise.then(_init);
        }

        return _commuter;
    });
