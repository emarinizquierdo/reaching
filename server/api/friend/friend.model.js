'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FriendSchema = new Schema({
    email: String,
    canSee: Boolean,
    seeing: Boolean
});

module.exports = mongoose.model('Friend', FriendSchema);
