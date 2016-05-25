'use strict';
var errors = require('errors');
var ArticleManager = require('managers/articleManager');
var Article = require('models/article');

module.exports = [
    {
        name: 'loadFeed',
        create: function (req, resource, params, body, config, callback) {
            var searchText = params.searchText,
                startIndex = parseInt(params.startIndex),
                pageSize = 5;
            (new ArticleManager()).findFeedList(searchText, startIndex, pageSize, function(err, result) {
                if(err) {
                    return callback(err);
                }
                callback(null, result.map(function(article){
                    return {
                        _id: article._id,
                        title: article.title,
                        content: article.content.substring(0, 200),
                        author: article._user._profile.fullName,
                        userId: article._user._id,
                        readonly: !(req.user && !article._user._id.equals(req.user._id)),
                        rating: article.rating,
                        comments: article._comments.length,
                        created: article.created,
                        backgroundPath: article.backgroundPath || '',
                        backgroundStyle: article.backgroundStyle || ''
                    };
                }));
            });
        }
    },
    {
        name: 'loadArticlesByUserId',
        create: function (req, resource, params, body, config, callback) {
            var findOptions = { _user: params.userId || (req.user ? req.user._id : null) };

            if(!(req.user && req.user._id.equals(findOptions._user))){
                findOptions.published = true;
            }
            Article.find(findOptions, {}, {sort: {created: -1}}).exec(function(err, articles){
                if(err) {
                    return callback(err);
                }
                callback(null, articles.map(function(article){
                    return {
                        _id: article._id,
                        title: article.title,
                        content: article.content ? article.content.substring(0, 200) : '',
                        published: article.published && (req.user && article._user.equals(req.user._id)),
                        rating: article.rating,
                        comments: article._comments.length,
                        created: article.created,
                        backgroundPath: article.backgroundPath || '',
                        backgroundStyle: article.backgroundStyle || ''
                    };
                }));
            });
        }
    },
];