var mongoose = require("lib/mongoose");
var errors = require('errors');
var async = require('async');

var schema = mongoose.Schema({
    content: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    _user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    _article: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
});

if(mongoose.models.Comment){
    module.exports = mongoose.models.Comment;
} else {
    module.exports = mongoose.model('Comment', schema);
}