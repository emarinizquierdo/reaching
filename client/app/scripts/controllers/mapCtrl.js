    angular.module('app')
        .controller('MapCtrl', ['$scope', '$http', '$interval', 'socket', function($scope, $http, $interval, socket) {

            var i, marker = new google.maps.Marker({
                    title: "Marker: "
                });


            var _routeID = "testtoken";
            var _travelMode = 'driving';
            $scope.route;
            $scope.myPosition = {};

            var init = function(p_callback) {

                socket.listen( _routeID, function(p_route) {

                    

                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                });

                $scope.$on('$destroy', function() {
                    socket.unsyncUpdates(_routeID);
                });

            };

            $scope.GenerateMapMarkers = function() {
                var lat, lng, loc;

                    lat = 43.6600000 + (Math.random() / 100);
                    lng = -79.4103000 + (Math.random() / 100);
                    loc = new google.maps.LatLng(lat, lng);
                    marker.setPosition(loc);
                    marker.setMap($scope.map);

            };

            $interval($scope.GenerateMapMarkers, 2000);

            init();

        }]);
