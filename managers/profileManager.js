var mongoose = require("lib/mongoose");
var async = require('async');
var errors = require('errors');
var User = require('models/user');
var Profile = require('models/profile');


var profileManager = function(){

};

profileManager.prototype.signup = function(data, callback){
    async.waterfall([
        function(callback){
            User.save(data, function(err, user){
                if(err){
                    if(err.code === 11000){
                        return callback(new errors.AuthError("User with such name already exists"));
                    } else{
                        return callback(err);
                    }
                }
                data._user = user._id;
                callback(null, user, data);
            });
        },
        function(user, data, callback){
            (new Profile(data)).save(function(err, profile){
                if(err) {
                    return callback(err);
                }
                callback(null, user, profile);
            });
        },
        function(user, profile, callback){
            user._profile = profile._id;
            user.save(function(err){
                if(err) {
                    return callback(err);
                }
                callback(null, profile);
            });
        }
    ],callback);
}

module.exports = profileManager;