var mongoose = require("lib/mongoose");
var errors = require('errors');
var async = require('async');
var Profile = require('models/profile');
var Article = require('models/article');
var User = require('models/user');

var ArticleManager = function(){

}

ArticleManager.pageSize = 5;

ArticleManager.prototype.findFeedList = function(searchText, startIndex, user, callback){
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
                    {'_user': { $in: profiles.map(function(profiles){ return profiles._user }) } }
                ]
            }
            Article.find(
                findOptions,
                {},
                {limit: ArticleManager.pageSize, skip: startIndex, sort: {created: -1}}
                )
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
                .exec(callback)
        }
    ],
    function(err, articles){
        if(err) return callback(err);
        callback(null, articles.map(function(article){
            return {
                    id: article._id,
                    title: article.title,
                    content: article.content.substring(0, 200),
                    author: article._user._profile.fullName,
                    userId: article._user._id,
                    readonly: !(user && !article._user._id.equals(user._id)),
                    rating: article.rating,
                    comments: article._comments.length,
                    created: article.created,
                    backgroundPath: article.backgroundPath || '',
                    backgroundStyle: article.backgroundStyle || ''
                }
        }));
    });
}

module.exports = ArticleManager;