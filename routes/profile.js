var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var checkAuth = require('middleware/checkAuth');
var router = express.Router();
var Profile = require('models/profile');
var User = require('models/user');


router.get('/', function(req, res, next){
    renderProfile(req.user._id, req, res, next);
});

router.get('/:id', function(req, res, next){
    renderProfile(req.params.id, req, res, next);
});

function renderProfile(userId, req, res, callback){
    Profile.findOne({_user: userId}).populate({
        path: '_user',
        model: 'User'
    }).exec(function(err, profile){
        if(err) return callback(err);
        res.render('profile',
            {
                user: profile._user,
                profile: profile,
                readonly: !(profile._user._id.equals(req.user._id))
            });
    });
}

router.post('/update', checkAuth, function(req, res, next){
    var Profile = mongoose.models.Profile;
    Profile.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        function(err, profile, resp) {
            if(err) return next(err);
            res.json(profile);
        });
});

router.post('/getEditDlg', function(req, res, next){
    Profile.findById(req.body.id).populate({
        path: '_user',
        model: 'User'
    }).exec(function(err, profile) {
        if(err) return next(err);
        res.render('partials/profileInfoEditDlg.ejs', { user: profile._user, profile: profile});
    });
});

module.exports = router;