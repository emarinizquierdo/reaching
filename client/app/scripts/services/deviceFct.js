'use strict';

angular.module('app')
  .factory('Device', function ($resource) {
    return $resource('/api/devices/:id', { id: '@id' },
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