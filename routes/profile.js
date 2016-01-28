var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var router = express.Router();
var Profile = require('models/profile');
var User = require('models/user');
var Article = require('models/article');

router.get('/', function(req, res, next){
    renderProfile(req.user._id, res, next);
});

router.get('/:id', function(req, res, next){
    renderProfile(req.params.id, res, next);
    console.log('By Id')
});

function renderProfile(userId, res, callback){
    async.waterfall([
        function(callback){
            Profile.findOne({_user: userId}, function(err, profile){
                if(err) return callback(err);
                callback(null, { profile: profile });
            })
        },
        function(result, callback){
            User.findById(userId, function(err, user){
                if(err) return callback(err);
                result.user = user;
                callback(null, result);
            })
        }
    ],function(err, result){
        if(err) return callback(err);
        result.userId = userId;
        result.readonly = res.locals.user._id.toString() != userId
        res.render('profile', result);
    })
}

module.exports = router;