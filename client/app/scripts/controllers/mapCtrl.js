    angular.module('app')
        .controller('MapCtrl', ['$scope', '$http', '$interval', 'socket', 'Friend', 'Auth', 'HotFriends', function($scope, $http, $interval, socket, Friend, Auth, HotFriends) {

            var i, marker = new google.maps.Marker({
                title: "Marker: "
            });


            var _routeID = "emmiting:";
            var _travelMode = 'driving';
            $scope.route;
            $scope.myPosition = {};
            $scope.HotFriends = HotFriends;

            _refreshMark = function(p_lat, p_long) {

                var loc;
                loc = new google.maps.LatLng(p_lat, p_long);
                marker.setPosition(loc);
                marker.setMap($scope.map);

            };

            var _refreshMarks = function() {
                angular.forEach($scope.HotFriends.list, function(p_friend) {
                    _refreshMark(p_friend.latitude, p_friend.latitude);
                })
            }

            $scope.$watch('HotFriends.list', function(p_new, p_old) {
                _refreshMarks();
            }, true)



        }]);
