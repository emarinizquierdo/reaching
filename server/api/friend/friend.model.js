'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FriendSchema = new Schema({
	userId: mongoose.Schema.Types.ObjectId,
    email: String,
    googleId: String,
    canSee: Boolean,
    seeing: Boolean
});

module.exports = mongoose.model('Friend', FriendSchema);
