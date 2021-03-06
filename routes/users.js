var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

router.post('/', function (req, res, next) {
    User.create({}, function (err, post) {
        if (err) {
            return next(err);
        }
        res.json(post);
    });
});

module.exports = router;
