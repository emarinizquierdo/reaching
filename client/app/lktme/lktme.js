'use strict';

angular.module('reachingApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/lktme', {
                templateUrl: 'app/lktme/lktme.html',
                controller: 'LktmeCtrl'
            })
            .when('/lktme/:id', {
                templateUrl: 'app/lktme/lktme.html',
                controller: 'LktmeCtrl'
            });
    });
