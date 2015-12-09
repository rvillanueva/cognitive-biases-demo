'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SessionSchema = new Schema({
  start: Date,
  end: Date,
  name: Boolean
});

module.exports = mongoose.model('Session', SessionSchema);
