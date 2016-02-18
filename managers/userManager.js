var mongoose = require("lib/mongoose");
var async = require('async');
var errors = require('errors');
var User = require('models/user');


var userManager = function(){

};

userManager.prototype.autorize = function(email, password, callback){
    async.waterfall([
        function(callback){
            User.findOne({ email: email }, callback);
        },
        function(user, callback){
            if(user) {
                if(user.checkPassword(password)){
                    callback(null, user);
                } else {
                    callback(new errors.AuthError("Invalid user or password"));
                }
            } else {
                callback(new errors.AuthError("Invalid user or password"));
            }
        }
    ], callback);
};

module.exports = userManager;