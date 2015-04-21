'use strict';

angular.module('socketMock', [])
  .factory('socket', function() {
    return {
      socket: {
        connect: function() {},
        on: function() {},
        emit: function() {},
        receive: function() {}
      },

      listen: function() {},
      emit: function() {},
      unsyncUpdates: function() {}
    };
  });