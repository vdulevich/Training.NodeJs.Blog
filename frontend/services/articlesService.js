'use strict';
var errors = require('errors');
var ArticleManager = require('managers/articleManager');
var Article = require('models/article');

module.exports = [
    {
        name: 'loadArticlesByFeedOptions',
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
            var userId = params.userId || (req.user ? req.user._id : null);
            var published = null;
            if(!(req.user && req.user._id.equals(userId))){
                published = true;
            }
            (new ArticleManager()).findByUserId(userId, published, function(err, articles){
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
                        author: article._user._profile.fullName,
                        userId: article._user._id,
                        backgroundPath: article.backgroundPath || '',
                        backgroundStyle: article.backgroundStyle || ''
                    };
                }));
            });
        }
    },
    {
        name: 'loadArticlesById',
        create: function (req, resource, params, body, config, callback) {
            if(params.id == null){
                return callback(errors.HttpError(404));
            }
            Article.findById(params.id, function(err, article){
                if(err) {
                    return callback(err);
                }
                if(article == null){
                    return callback(errors.HttpError(404));
                } else if(!article.published && article._user.equals(req.user)){
                    return callback(errors.HttpError(403));
                } else {
                    return callback(null, article);
                }
            });
        }
    },
    {
        name: 'saveArticle',
        create: function (req, resource, params, body, config, callback) {
            if(req.user == null){
                return callback(errors.HttpError(404));
            }
            params._user = req.user._id;
            params.published = params.published || false;
            /* if(req.file && req.file.path) {
                req.params.backgroundPath = req.file.path;
                req.params.backgroundFileName = req.file.originalname;
            }*/
            (new ArticleManager()).save(params, function(err, result){
                if(err) {
                    callback(err);
                }
                callback(null, result);
            });
        }
    }
];