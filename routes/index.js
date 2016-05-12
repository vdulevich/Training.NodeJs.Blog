var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ArticleManager = require('managers/articleManager');
var ArticleFeedListComponent = require('frontend/components/article/articlesFeedList');

router.get('/', function(req, res, next){
    'use strict';
    (new ArticleManager()).findFeedList(null, 0, ArticleManager.pageSize, function(err, result) {
        if(err) {
            return next(err);
        }
        var articles = result.map(function(article){
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
        });

        res.render('index', {
            searchText : '',
            pageSize: ArticleManager.pageSize,
            articles: JSON.stringify(articles),
            articleFeedListComponentMarkup: ReactDOMServer.renderToString(React.createFactory(ArticleFeedListComponent)({
                data: articles,
                searchText: '',
                pageSize: ArticleManager.pageSize
            }))
        });
    });
});

router.get('/search/:text', function(req, res, next){
    'use strict';
    (new ArticleManager()).findFeedList(req.params.text, 0, ArticleManager.pageSize, function(err, result) {
        if(err) {
            return next(err);
        }
        var articles = result.map(function(article){
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
        });

        res.render('index', {
            searchText : req.params.text,
            pageSize: ArticleManager.pageSize,
            articles: JSON.stringify(articles),
            articleFeedListComponentMarkup: ReactDOMServer.renderToString(React.createFactory(ArticleFeedListComponent)({
                data: articles,
                searchText: req.params.text,
                pageSize: ArticleManager.pageSize
            }))
        });
    });
});


module.exports = router;