'use strict';

angular.module('app')
    .factory('commuter', function($rootScope, Friend, HotFriends, Auth, socket, location, $timeout, Properties) {

        var _commuter = {};
        var _me = Auth.getCurrentUser();
        var _beaconLaunched = false;

        var _LoadFriends = function() {
            Friend.get(null, function(data) {

                var _i = 0;

                HotFriends.list = {};

                for (_i = 0; _i < data.length; _i++) {
                    HotFriends.list[data[_i].email] = data[_i]
                }

                _addTokenForListenFriend(HotFriends.list);
                if(!_beaconLaunched){
                    _beaconLaunched = true;
                    beacon();
                } 

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

            var info = {};

            location.position().then(function(p_position) {

                console.log('emiting');
                info.latitude = p_position.coords.latitude;
                info.longitude = p_position.coords.longitude;
                _emmitForEach(HotFriends.list, info);
                $timeout(beacon, 5000);

            });

        };

        var _emmitForEach = function(p_friends, p_info) {
            angular.forEach(HotFriends.list, function(p_friend) {
                p_info.email = _me.email;
                socket.emit(p_friend.email, _me.email, p_info);
            });
        }

        var _reloadFriends = function(){
            $rootScope.$on(Properties.events.RELOAD_FRIENDS, _LoadFriends);
        };

        var _init = function() {
            _LoadFriends();
            _reloadFriends();
        };

        if (_me.$promise) {
            _me.$promise.then(_init);
        }

        return _commuter;
    });
