'use strict';

var _ = require('lodash');
var Session = require('./session.model');

// Get list of sessions
exports.index = function(req, res) {
  Session.find(function (err, sessions) {
    if(err) { return handleError(res, err); }
    return res.json(200, sessions);
  });
};

// Get a single session
exports.show = function(req, res) {
  Session.findById(req.params.id, function (err, session) {
    if(err) { return handleError(res, err); }
    if(!session) { return res.send(404); }
    return res.json(session);
  });
};

// Creates a new session in the DB.
exports.create = function(req, res) {
  Session.create(req.body, function(err, session) {
    if(err) { return handleError(res, err); }
    return res.json(201, session);
  });
};

// Updates an existing session in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Session.findById(req.params.id, function (err, session) {
    if (err) { return handleError(res, err); }
    if(!session) { return res.send(404); }
    var updated = _.merge(session, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, session);
    });
  });
};

// Deletes a session from the DB.
exports.destroy = function(req, res) {
  Session.findById(req.params.id, function (err, session) {
    if(err) { return handleError(res, err); }
    if(!session) { return res.send(404); }
    session.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}