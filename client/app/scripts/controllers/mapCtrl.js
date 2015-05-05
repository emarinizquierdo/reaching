    angular.module('app')
        .controller('MapCtrl', ['$scope', '$http', '$interval', 'socket', 'Friend', 'Auth', 'HotFriends', function($scope, $http, $interval, socket, Friend, Auth, HotFriends) {

            var i, markers = {};




            var _routeID = "emmiting:";
            var _travelMode = 'driving';
            $scope.route;
            $scope.myPosition = {};
            $scope.HotFriends = HotFriends;

            _refreshMark = function(p_friend) {

                var loc;
                loc = new google.maps.LatLng(p_friend.latitude, p_friend.longitude);
                if (!markers[p_friend.email]) {

                    markers[p_friend.email] = new google.maps.Marker({
                        title: "Marker: ",
                        icon: (p_friend.userInfo && p_friend.userInfo.google && p_friend.userInfo.google.image && p_friend.userInfo.google.image.url) ? p_friend.userInfo.google.image.url : null
                    });

                }
                markers[p_friend.email].setPosition(loc);
                markers[p_friend.email].setMap($scope.map);


            };

            var _refreshMarks = function() {
                angular.forEach($scope.HotFriends.list, function(p_friend) {
                    _refreshMark(p_friend)
                })
            }

            $scope.$watch('HotFriends.list', function(p_new, p_old) {
                _refreshMarks();
            }, true)



        }]);
