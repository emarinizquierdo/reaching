'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  id: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model('Thing', ThingSchema);