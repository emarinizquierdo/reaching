'use strict';

angular.module('app')
  .factory('Friend', function ($resource) {
    return $resource('/api/friends/:id', { id: '@id' },
    { //parameters default
      create: {
        method: 'POST'
      },
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        isArray : true
      },
      delete: {
        method: 'DELETE'
      }
    });
  });