var express = require('express');
var mongoose = require('lib/mongoose');
var router = express.Router();
var errors = require('errors');
var Profile = require('models/profile');
var User = require('models/user');


router.post('/', function(req, res, next){
    Profile.create(
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
        function(err, profile){
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
            console.log(profile);
        req.session.user = profile._user.toString();
        res.end('');
    });
});

router.post('/validate', function(req, res, next){
    User.findOne({ email: req.body.email }, function(err, user){
        if(err) return next(err);
        console.log(user);
        res.end(user ? 'false': 'true');
    });
});

module.exports = router;
