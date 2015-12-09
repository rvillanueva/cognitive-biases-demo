'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnchorSchema = new Schema({
  range: {
    low: Number,
    high: Number
  },
  anchor: Number,
  direction: String,
  choice: Number,
  theme: String,
  submitted: Date,
  exclude: Boolean
});

module.exports = mongoose.model('Anchor', AnchorSchema);
