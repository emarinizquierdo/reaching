'use strict';

angular.module('app')
  .factory('Properties', function ($resource) {
    
    var _properties = {

      events : {
        RELOAD_FRIENDS : "RELOAD_FRIENDS"
      }



    };

    return _properties;
  });