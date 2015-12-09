'use strict';

var express = require('express');
var controller = require('./anchor.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
