var mongoose = require("lib/mongoose");
var async = require('async');
var Comment = require('models/comment');
var Article = require('models/article');

var commentManager = function(){

}

commentManager.prototype.create = function(data, callback){
    async.waterfall([
        function(callback){
            (new Comment(data)).save(function(err, comment){
                if(err) return callback(err);
                callback(null, comment);
            });
        },
        function(comment, callback){
            Article.findById(comment._article, function(err, article){
                if(err) callback(err);
                article._comments.push(comment._id);
                article.save(function(err, article){
                    if(err) callback(err);
                    callback(null, comment);
                })
            })
        },
        function(comment, callback) {
            Comment.populate(comment, {
                path: '_user',
                model: 'User',
                select: '_profile',
                populate: {
                    path: '_profile',
                    model: 'Profile',
                    select: 'firstName lastName'
                }
            }, callback)
        }
    ],function(err, comment){
        if(err) return callback(err);
        callback(null, comment);
    })
}

module .exports = commentManager;