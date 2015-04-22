'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
	userId: mongoose.Schema.Types.ObjectId,
    deviceId: String,
    status: Boolean
});

module.exports = mongoose.model('Device', DeviceSchema);
