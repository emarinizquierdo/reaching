'use strict';

angular.module('reachingApp')
    .controller('MainCtrl', function($scope, $http, $location, socket, location, utils) {

        var _routID;

        $scope.awesomeThings = [];

        $http.get('/api/things').success(function(awesomeThings) {
            $scope.awesomeThings = awesomeThings;
            socket.syncUpdates('thing', $scope.awesomeThings);
        });

        $scope.addThing = function() {
            if ($scope.latitude === '') {
                return;
            }
            $http.post('/api/things', {
                id: utils.guid(),
                latitude: $scope.latitude,
                longitude: $scope.longitude
            });
            $scope.latitude = '';
        };

        $scope.deleteThing = function(thing) {
            $http.delete('/api/things/' + thing._id);
        };

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thing');
        });

        $scope.generateLink = function() {

            location.position(function(p_position) {

                if (!_routID) {
                    $http.post('/api/things', {
                        id: utils.guid(),
                        latitude: p_position.coords.latitude,
                        longitude: p_position.coords.longitude
                    }).then(function(p_data ){
                      $location.path("/emmiter/" + p_data.data._id);
                    });
                } else {
                    $http.put('/api/things/' + _routID, {
                        latitude: p_position.coords.latitude,
                        longitude: p_position.coords.longitude
                    });
                }
            });

        };

    });
