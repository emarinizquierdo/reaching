'use strict';

angular.module('app')
  .factory('Plus', function ($resource) {
    return $resource('https://www.googleapis.com/plus/v1/people', { query: '@query' },
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