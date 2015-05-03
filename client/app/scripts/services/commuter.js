'use strict';

angular.module('app')
    .factory('commuter', function(Friend, HotFriends, Auth, socket) {

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

        var guid = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4();
        }

        var _init = function() {
            _LoadFriends();
        };

        if (_me.$promise) {
            _me.$promise.then(_init);
        }

        return _commuter;
    });
