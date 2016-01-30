var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var checkAuth = require('middleware/checkAuth');
var router = express.Router();
var Profile = require('models/profile');
var User = require('models/user');


router.get('/', function(req, res, next){
    renderProfile(req.user._id, res, next);
});

router.get('/:id', function(req, res, next){
    renderProfile(req.params.id, res, next);
});

router.post('/update', checkAuth, function(req, res, next){
    var Profile = mongoose.models.Profile;
    Profile.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        function(err, profile, resp) {
            if(err) return next(err);
            res.json(profile);
        });
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
                result.readonly = res.locals.user._id.toString() != userId
                callback(null, result);
            })
        }
    ],function(err, result){
        if(err) return callback(err);
        res.render('profile', result);
    });
}

module.exports = router;