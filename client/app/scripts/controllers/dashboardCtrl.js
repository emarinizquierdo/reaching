'use strict';

angular.module('app')
    .controller('dashboardCtrl', ['$scope', '$window', 'Friend', function($scope, $window, Friend) {

    	$scope.totalFriends = 10;
    	$scope.friends = [];

        $scope.savePost = function(p_data) {

            Friend.create(p_data, _LoadFriends, function(data){

            });

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

        _LoadFriends();

    }]);
