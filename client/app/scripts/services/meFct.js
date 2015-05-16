'use strict';

angular.module('app')
    .factory('Me', function($rootScope) {

        var _me = {};

        _me.geoloc = {};


        return _me;
    });
