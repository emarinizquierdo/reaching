    angular.module('app')
        .controller('MapCtrl', ['$scope', '$http', '$interval', 'socket', 'Friend', 'Auth', function($scope, $http, $interval, socket, Friend, Auth) {

            var i, marker = new google.maps.Marker({
                title: "Marker: "
            });


            var _routeID = "emmiting:";
            var _travelMode = 'driving';
            $scope.route;
            $scope.myPosition = {};

            var _handler = function(p_route) {


                $scope.GenerateMapMarkers( p_route.latitude, p_route.longitude);
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

            };



            $scope.GenerateMapMarkers = function( p_lat, p_long) {

                var loc;
                loc = new google.maps.LatLng(p_lat, p_long);
                marker.setPosition(loc);
                marker.setMap($scope.map);

            };


            var _LoadFriends = function() {
                Friend.get(null, function(data) {
                    friends = data;
                    _emmitForEach(friends);
                }, function(data) {

                })
            }

            var _emmitForEach = function(p_friends) {
                angular.forEach(p_friends, function(p_friend) {
                    var _me = Auth.getCurrentUser()
                    if (_me.google && _me.google.id && p_friend && p_friend.userInfo && p_friend.userInfo.google && p_friend.userInfo.google.id) {
                        var _key = p_friend.userInfo.google.id.replace(/\"/g, "") + ":" + _me.google.id.replace(/\"/g, "");
                        socket.listen(_key, _handler);
                        $scope.$on('$destroy', function() {
                            socket.unsyncUpdates(_routeID);
                        });
                    }

                })
            }

            _LoadFriends();

        }]);
