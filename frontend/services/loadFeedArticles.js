'use strict';
var mongoose = require('lib/mongoose');
var errors = require('errors');
var Article = require('models/article');
var ArticleManager = require('managers/articleManager');

module.exports = {
    name: 'loadFeedArticles',
    create: function (req, resource, params, body, config, callback) {
        var searchText = '',//req.body.searchText,
            startIndex = 0,//parseInt(params.startIndex),
            pageSize = 5;//parseInt(params.pageSize);

        (new ArticleManager()).findFeedList(searchText, startIndex, pageSize, function(err, result) {
            if(err) {
                return callback(err);
            }
            callback(null, result.map(function(article){
                return {
                    id: article._id,
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
};