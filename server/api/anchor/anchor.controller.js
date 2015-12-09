'use strict';

var _ = require('lodash');
var Anchor = require('./anchor.model');

// Get list of anchors
exports.index = function(req, res) {
  var start = req.query.start;
  var end = req.query.end;
  console.log(req.query)
  if (start && end){
    Anchor.find({"submitted": {"$gte": start, "$lt": end}}, function (err, anchors) {
      if(err) { return handleError(res, err); }
      return res.json(200, anchors);
    });
  } else if (start) {
    Anchor.find({"submitted": {"$gte": start}}, function (err, anchors) {
      if(err) { return handleError(res, err); }
      return res.json(200, anchors);
    });
  } else {
    Anchor.find(function (err, anchors) {
      if(err) { return handleError(res, err); }
      return res.json(200, anchors);
    });

  }
};

// Get a single anchor
exports.show = function(req, res) {
  Anchor.findById(req.params.id, function (err, anchor) {
    if(err) { return handleError(res, err); }
    if(!anchor) { return res.send(404); }
    return res.json(anchor);
  });
};

// Creates a new anchor in the DB.
exports.create = function(req, res) {
  var created = req.body;
  created.submitted = new Date();
  Anchor.create(req.body, function(err, anchor) {
    if(err) { return handleError(res, err); }
    return res.json(201, anchor);
  });
};

// Updates an existing anchor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Anchor.findById(req.params.id, function (err, anchor) {
    if (err) { return handleError(res, err); }
    if(!anchor) { return res.send(404); }
    var updated = _.merge(anchor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, anchor);
    });
  });
};

// Deletes a anchor from the DB.
exports.destroy = function(req, res) {
  Anchor.findById(req.params.id, function (err, anchor) {
    if(err) { return handleError(res, err); }
    if(!anchor) { return res.send(404); }
    anchor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
