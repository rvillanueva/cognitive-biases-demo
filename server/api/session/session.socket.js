/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Session = require('./session.model');

exports.register = function(socket) {
  Session.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Session.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('session:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('session:remove', doc);
}