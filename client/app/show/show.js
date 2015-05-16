'use strict';

angular.module('app')
    .controller('showCtrl', ['$rootScope', '$scope', '$window', '$stateParams', 'HotFriends', 'Friend', 'Device', 'Properties', 'Me', function($rootScope, $scope, $window, $stateParams, HotFriends, Friend, Device, Properties, Me) {

        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;

        var friendLoc, friendMark;
        var meLoc, meMark;

        $scope.route;
        $scope.myPosition = {};
        $scope.HotFriends = HotFriends;
        $scope.friend;
        $scope.duration;

        var _InitMap = function() {

            meLoc = new google.maps.LatLng(40.4187163, -3.6997927);

            var mapOptions = {
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: meLoc
            }

            directionsDisplay = new google.maps.DirectionsRenderer();
            map = new google.maps.Map(document.getElementById("bigmap"), mapOptions);
            directionsDisplay.setMap(map);

        }

        var calcRoute = function() {
            var request = {
                origin: friendLoc,
                destination: new google.maps.LatLng(Me.geoloc.latitude, Me.geoloc.longitude),
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    $scope.duration = (result.routes && result.routes[0] && result.routes[0].legs && result.routes[0].legs[0] && result.routes[0].legs[0].duration) ? result.routes[0].legs[0].duration.text : false;
                    directionsDisplay.setDirections(result);
                    directionsDisplay.setOptions({
                        suppressMarkers: true
                    });
                }
            });
        }

        var _refreshMark = function(p_friend) {


            friendLoc = new google.maps.LatLng(p_friend.latitude, p_friend.longitude);
            meLoc = new google.maps.LatLng(Me.geoloc.latitude, Me.geoloc.longitude);

            var _meIcon = new google.maps.MarkerImage("https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/images/markers-plain.png", new google.maps.Size(12, 20));

            calcRoute();

            if(friendMark) friendMark.setMap(null);
            if(meMark) meMark.setMap(null);

            friendMark = new google.maps.Marker({
                title: "Marker: ",
                icon: (p_friend.userInfo && p_friend.userInfo.google && p_friend.userInfo.google.image && p_friend.userInfo.google.image.url) ? p_friend.userInfo.google.image.url : null
            });

            meMark = new google.maps.Marker({
                title: "Marker: ",
                icon: (Me && Me.google && Me.google.image && Me.google.image.url) ? Me.google.image.url : _meIcon
            });

            friendMark.setPosition(friendLoc);
            
            friendMark.setMap(map);

            meMark.setPosition(meLoc);
            
            meMark.setMap(map);

        };

        var _refreshMarks = function() {

            angular.forEach($scope.HotFriends.list, function(p_friend) {
                if (p_friend._id == $scope.friend._id) {
                    _refreshMark(p_friend)
                }
            });

        }

        var _listener = function() {

            $scope.$watch('HotFriends.list', function(p_new, p_old) {
                _refreshMarks();
            }, true);

        };

        var _LoadFriend = function() {
            Friend.get({
                id: $stateParams.userId
            }, function(data) {
                $scope.friend = data[0];
                _listener();

            }, function(data) {

            });
        }

        _InitMap();
        _LoadFriend();

    }]);
