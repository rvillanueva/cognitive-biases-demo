/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Anchor = require('./anchor.model');

exports.register = function(socket) {
  Anchor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Anchor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('anchor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('anchor:remove', doc);
}