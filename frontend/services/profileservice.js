'use strict';
var errors = require('errors');
var ProfileManager = require('managers/profileManager');
var Profile = require('models/profile');

module.exports = [
    {
        name: 'loadProfile',
        create: function (req, resource, params, body, config, callback) {
            var userId = params.userId == undefined ? (req.user == undefined ? undefined: req.user.id) : params.userId ;
            (new ProfileManager()).getByUserId(userId, function(err, profile) {
                if(err) {
                    return callback(err);
                }
                if(!profile){
                    return callback(errors.HttpError(404));
                }
                callback(null, profile);
            });
        }
    },
    {
        name: 'saveProfile',
        create: function (req, resource, params, body, config, callback) {
            Profile.findOneAndUpdate({_id: params._id}, params, {new: true})
                .populate({
                    path: '_user',
                    model: 'User'
                })
                .exec(function(err, profile) {
                        if(err) {
                            return callback(err);
                        }
                        callback(null, profile);
                    }
                );
        }
    }
];