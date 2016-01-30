var mongoose = require("lib/mongoose");
var async = require('async');
var AuthError = require('errors').AuthError;

var schemaOptions = {
    toObject: {
        virtuals: true
    }
    ,toJSON: {
        virtuals: true
    }
};

var schema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required:true
    },
    birthday:{
        type: Date,
        required:false
    },
    _user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
},schemaOptions);

schema.virtual('fullName')
    .get(function(){
        return [this.firstName, this.lastName].join(' ');
    });

schema.static('signup', function(data, callback) {
    var User = mongoose.models.User,
        Profile = mongoose.models.Profile;
    async.waterfall([
        function(callback){
            User.save(data, function(err, user){
                if(err){
                    if(err.code == 11000){
                        return callback(new AuthError("User with such name already exists"))
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
                if(err) return callback(err);
                callback(null, user, profile);
            });
        },
        function(user, profile, callback){
            user._profile = profile._id;
            user.save(function(err){
                if(err) return callback(err);
                callback(null, profile);
            });
        }
    ],callback);
});

if(mongoose.models.Profile){
    module.exports = mongoose.models.Profile;
} else {
    module.exports = mongoose.model('Profile', schema);
}