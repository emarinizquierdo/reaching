'use strict';

angular.module('app')
    .controller('dashboardCtrl', ['$rootScope', '$scope', '$window', 'Friend', 'Device', 'Properties', function($rootScope, $scope, $window, Friend, Device, Properties) {

        $scope.totalFriends = 10;
        $scope.friends = [];
        $scope.devices = [];

        $scope.saveDevice = function(p_data) {

            Device.create(p_data, _LoadDevices, function(data) {

            });

        }

        $scope.deleteDevice = function(_id) {
            Device.delete({
                id: _id
            }, _LoadDevices, function(error) {

            });
        }

        $scope.saveFriend = function(p_data) {

            Friend.create(p_data, _LoadFriends, function(data) {
                $rootScope.$emit(Properties.events.RELOAD_FRIENDS);
            });

        }

        $scope.deleteFriend = function(_id) {
            Friend.delete({
                id: _id
            }, _LoadFriends, function(error) {
                $rootScope.$emit(Properties.events.RELOAD_FRIENDS);
            });
        }

        function _LoadDevices() {
            Device.get(null, function(data) {
                $scope.devices = data;
            }, function(data) {

            })
        }

        function _LoadFriends() {
            Friend.get(null, function(data) {
                $scope.friends = data;
                $scope.doughnut.data[0] = $scope.friends.length;
                $scope.doughnut.data[1] = $scope.totalFriends - $scope.friends.length
                $rootScope.$emit(Properties.events.RELOAD_FRIENDS);
            }, function(data) {

            });
        }

        $scope.doughnut = {
            labels: ["", "Usuarios añadidos"],
            legend: true,
            data: [],
            colours: ['#FD1F5E','#1EF9A1','#7FFD1F','#68F000']
        }

        $scope.easypiechartsm4 = {
            percent: 0,
            options: {
                animate: {
                    duration: 1500,
                    enabled: false
                },
                barColor: $scope.color.danger,
                lineCap: 'round',
                size: 120,
                lineWidth: 5
            }
        };

        _LoadDevices();
        _LoadFriends();

        gapi.client.load('plus', 'v1');

    }]);
