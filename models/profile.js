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

if(mongoose.models.Profile){
    module.exports = mongoose.models.Profile;
} else {
    module.exports = mongoose.model('Profile', schema);
}