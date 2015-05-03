/* global io */
'use strict';

angular.module('app')
    .factory('socket', function($location, socketFactory) {

        var _host = ($location.host() == "localhost") ? '' : 'hermes-nefele.rhcloud.com:8000';

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
            listenPositions: function( p_from, p_me, cb) {
                cb = cb || angular.noop;

                /**
                 * Syncs item creation/updates on 'model:save'
                 */
                console.log("emmiting:" + p_from + ":" + p_me);
                socket.on( "emmiting:" + p_from + ":" + p_me, function(item) {
                    console.log('receiving position');
                    cb(item);
                });

            },

            emit: function(p_target, p_me, p_info) {
              console.log("emmiting:" + p_me + ":" + p_target);
              socket.emit('emiting', {target: p_target, email: p_me, info: p_info});
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