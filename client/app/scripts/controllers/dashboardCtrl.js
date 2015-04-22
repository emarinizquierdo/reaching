'use strict';

angular.module('app')
    .controller('dashboardCtrl', ['$scope', '$window', 'Friend', 'Device', function($scope, $window, Friend, Device) {

    	$scope.totalFriends = 10;
    	$scope.friends = [];
    	$scope.devices = [];

    	$scope.saveDevice = function(p_data) {

            Device.create(p_data, _LoadDevices, function(data){

            });

        }

        $scope.deleteDevice = function(_id) {
            Device.delete({id : _id}, _LoadDevices, function(error) {

            });
        }

        $scope.saveFriend = function(p_data) {

            Friend.create(p_data, _LoadFriends, function(data){

            });

        }

        $scope.deleteFriend = function(_id) {
            Friend.delete({id : _id}, _LoadFriends, function(error) {

            });
        }

        function _LoadDevices() {
            Device.get(null, function(data){
            	$scope.devices = data;
            }, function(data){

            })
        }

        function _LoadFriends() {
            Friend.get(null, function(data){
            	$scope.friends = data;
            	$scope.easypiechartsm4.percent = ( $scope.friends.length * 100) / $scope.totalFriends ;
            }, function(data){

            })
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

    }]);
