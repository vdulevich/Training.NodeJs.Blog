var express = require('express');
var mongoose = require('lib/mongoose');
var router = express.Router();
var User = require('models/user');
var errors = require('errors');


router.post('/', function(req, res, next){
    User.autorize(req.body.email, req.body.password, function(err, user){
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
        res.json({email: user.email});
    });
});

module.exports = router;
