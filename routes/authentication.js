var express = require('express');
var mongoose = require('lib/mongoose');
var router = express.Router();
var errors = require('errors');
var User = require('models/user');
var UserManager = require('managers/userManager');
var ProfileManger = require('managers/profileManager');


router.post('/login', function(req, res, next){
    (new UserManager()).autorize(req.body.email, req.body.password, function(err, user){
        if(err) {
            if (err instanceof errors.AuthError) {
                return next(new errors.HttpError(403, err.message));
            } else if(err instanceof mongoose.Error.ValidationError){
                return next(new errors.HttpError(403, err.message));
            }
            else {
                return next(err);
            }
        }
        if(req.body.remember){
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else{
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
        req.session.user = user._id.toString();
        res.json(user);
    });
});

router.post('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('/');
});

router.post('/signup', function(req, res, next){
    (new ProfileManger()).signup(req.body, function(err, profile) {
        if(err) {
            if (err instanceof errors.AuthError) {
                return next(new errors.HttpError(403, err.message));
            } else if(err instanceof mongoose.Error.ValidationError){
                return next(new errors.HttpError(403, err.message));
            }
            else {
                return next(err);
            }
        }
        req.session.user = profile._user.toString();
        res.json(profile._user);
    });
});

router.post('/signup/validate', function(req, res, next){
    User.findOne({ email: req.body.email }, function(err, user){
        if(err) {
            return next(err);
        }
        res.end(user ? 'false': 'true');
    });
});

module.exports = router;
