'use strict';
var mongoose = require('lib/mongoose');
var errors = require('errors');
var UserManager = require('managers/userManager');

module.exports = [{
        name: 'login',
        create: function (req, resource, params, body, config, callback) {
            (new UserManager()).autorize(body.email, body.password, function(err, user){
                if(err) {
                    if (err instanceof errors.AuthError) {
                        return callback(new errors.HttpError(403, err.message));
                    } else if(err instanceof mongoose.Error.ValidationError){
                        return callback(new errors.HttpError(403, err.message));
                    }
                    else {
                        return callback(err);
                    }
                }
                if(req.body.remember){
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                } else{
                    req.session.cookie.expires = false; // Cookie expires at end of session
                }
                req.session.user = user._id.toString();
                callback(null, user);
            });
        }
    },
    {
        name: 'logout',
        create: function (req, resource, params, body, config, callback) {
            req.session.destroy();
            callback(null);
        }
    }
];