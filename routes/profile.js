var async = require('async');
var express = require('express');
var router = express.Router();
var checkAuth = require('middleware/checkAuth');
var errors = require('errors');
var Profile = require('models/profile');
var ProfileManager = require('managers/profileManager');
var User = require('models/user');

router.get('/', checkAuth, function(req, res, next){
    (new ProfileManager()).getByUserId(req.user._id, function(err, profile) {
        if(err) {
            return next(err);
        }
        if(!profile){
            return next(errors.HttpError(404));
        }
        res.render('profile', {
            profile: profile,
            readonly: false
        });
    });
});

router.get('/:id', function(req, res, next){
    if(!req.params.id){
        return next(errors.HttpError(404));
    }
    (new ProfileManager()).getByUserId(req.params.id, function(err, profile) {
        if(err) {
            return next(err);
        }
        if(!profile){
            return next(errors.HttpError(404));
        }
        res.render('profile', {
            profile: profile,
            readonly: !(req.user && profile._user._id.equals(req.user._id))
        });
    });
});

router.post('/getEditDlg', function(req, res, next){
    Profile.findById(req.body.id).populate({
        path: '_user',
        model: 'User'
    }).exec(function(err, profile) {
        if(err) {
            return next(err);
        }
        res.render('partials/profile/profileInfoEditDlg.ejs', { user: profile._user, profile: profile});
    });
});

router.post('/update', checkAuth, function(req, res, next){
    Profile.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
        .populate({
            path: '_user',
            model: 'User'
        })
        .exec(function(err, profile) {
                if(err) {
                    return next(err);
                }
                res.json(profile);
            }
        );
});

module.exports = router;