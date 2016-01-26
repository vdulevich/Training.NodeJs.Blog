var mongoose = require('lib/mongoose');
var Profile = require('models/profile');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    Profile.findOne({_user: req.user._id.toString()}, function(err, profile){
        if(err) return next(err);
        res.render('profile', { profile: profile });
    })
});

module.exports = router;