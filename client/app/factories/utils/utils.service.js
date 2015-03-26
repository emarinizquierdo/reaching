'use strict';

angular.module('reachingApp')
    .factory('utils', function() {

        var _utils = {};


        _utils.guid = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + s4() + s4();
        };

        return _utils;
    });
