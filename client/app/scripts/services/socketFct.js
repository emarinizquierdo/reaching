/* global io */
'use strict';

angular.module('app')
    .factory('socket', function($location, socketFactory) {

        var _host = ($location.host() == "location") ? '' : 'hermes-nefele.rhcloud.com:8000';
        
        // socket.io now auto-configures its connection when we ommit a connection url
        var ioSocket = io(_host, {
            // Send auth token on connection, you will need to DI the Auth service above
            // 'query': 'token=' + Auth.getToken()
            path: '/socket.io-client'
        });

        var socket = socketFactory({
            ioSocket: ioSocket
        });

        return {
            socket: socket,

            /**
             * Register listeners to sync an array with updates on a model
             *
             * Takes the array we want to sync, the model name that socket updates are sent from,
             * and an optional callback function after new items are updated.
             *
             * @param {String} modelName
             * @param {Array} array
             * @param {Function} cb
             */
            listen: function( p_key, cb) {
                cb = cb || angular.noop;

                /**
                 * Syncs item creation/updates on 'model:save'
                 */
                socket.on( "emmiting:" + p_key , function(item) {
                    console.log('receiving');
                    cb(item);
                });

            },

            emit: function(p_model) {
              socket.emit('emiting', p_model);
            },
            /**
             * Removes listeners for a models updates on the socket
             *
             * @param modelName
             */
            unsyncUpdates: function(p_id) {
                socket.removeAllListeners( "emmiting:" + p_key );
            }
        };
    });