var mongoose = require("lib/mongoose");
var errors = require('errors');
var async = require('async');
var Profile = require('models/profile');
var Article = require('models/article');


var ArticleManager = function(){

}

ArticleManager.pageSize = 5;

ArticleManager.prototype.findFeedList = function(searchText, startIndex, pageSize, callback){
    async.waterfall
    ([
        function(callback){
            if(searchText) {
                Profile
                    .find({ $or : [{'firstName' : new RegExp(searchText, "i")}, {'lastName' : new RegExp(searchText, "i")}] })
                    .select({ _user: 1})
                    .exec(callback);
            } else {
                callback(null, []);
            }
        },
        function(profiles, callback) {
            var findOptions = { published : true };
            if(searchText){
                findOptions.$or = [
                    {'title' : new RegExp(searchText, "i") },
                    {'_user': { $in: profiles.map(function(profiles){ return profiles._user; }) } }
                ];
            }
            Article
                .find(findOptions, {}, {limit: pageSize, skip: startIndex, sort: {created: -1}})
                .populate({
                    path: '_user',
                    model: 'User',
                    select: '_profile',
                    populate: {
                        path: '_profile',
                        model: 'Profile',
                        select: 'firstName lastName'
                    }
                })
                .exec(callback);
        }
    ],
    function(err, articles){
        if(err) return callback(err);
        callback(null, articles);
    });
}

ArticleManager.prototype.save = function(article, callback){
    async.waterfall([
        function(callback){
            Article.findById(article._id, callback);
        },
        function(oldArticle, callback){
            if(!oldArticle){
                (new Article(article)).save(function(err, newArticle){
                    if(err) return callback(err);
                    callback(null, oldArticle, newArticle);
                });
            } else if(oldArticle._user.equals(article._user)) {
                Article.findOneAndUpdate(
                    { _id: article._id },
                    { $set: article },
                    { new: true, runValidators: true },
                    function(err, newArticle){
                        if(err) return callback(err);
                        callback(null, oldArticle, newArticle);
                    }
                );
            } else {
                callback(new errors.HttpError(403));
            }
        },
        function(oldArticle, newArticle, callback){
            if(oldArticle &&
               oldArticle.backgroundPath &&
               oldArticle.backgroundPath != newArticle.backgroundPath) {
                require('fs').unlink(oldArticle.backgroundPath);
            }
            callback(null, newArticle);
        }
    ], function(err, article){
        if(err) return next(err);
        callback(null, article);
    });
}

module.exports = ArticleManager;