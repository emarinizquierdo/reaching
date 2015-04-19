'use strict';

angular.module('reachingApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/emmiter/', {
                templateUrl: 'app/emmiter/emmiter.html',
                controller: 'EmmiterCtrl'
            })
            .when('/emmiter/:id', {
                templateUrl: 'app/emmiter/emmiter.html',
                controller: 'EmmiterCtrl'
            });
    });
