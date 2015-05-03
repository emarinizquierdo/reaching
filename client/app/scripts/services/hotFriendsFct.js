'use strict';

angular.module('app')
    .factory('HotFriends', function() {

        var _HotFriends = {};

        _HotFriends.list = [];

        return _HotFriends;
    });
