var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var errors = require('errors');
var checkAuth = require('middleware/checkAuth')
var multer = require('multer');
var upload  = multer({ dest: 'public/articlesbg' });
var router = express.Router();
var Article = require('models/article');
var ArticleManager = require('managers/articleManager');


router.post('/getArticleViewData', function(req, res, next) {
    Article.findById(req.body.id, function(err, article){
        if(err) {
            return next(err);
        }
        if(article && article.published) {
            res.json({
                article: article,
                readonly: !(req.user && !article._user.equals(req.user._id))
            });
        } else {
            return next(errors.HttpError(404));
        }
    });
});

router.post('/save', checkAuth, upload.single('background'), function(req, res, next) {
    req.body._user = req.user._id;
    req.body.published = req.body.published || false;
    if(req.file && req.file.path) {
        req.body.backgroundPath = req.file.path;
        req.body.backgroundFileName = req.file.originalname;
    }
    (new ArticleManager()).save(req.body, function(err, result){
        if(err) next(err);
        res.json(result);
    });
});

router.post('/delete', checkAuth, function(req, res, next){
    Article.remove({_id: req.body.id, _user: req.user },
        function(err) {
            if(err) return next(err);
            res.end();
        });
});

router.post('/findFeedList', function(req, res, next){
    var searchText = req.body.searchText,
        startIndex = parseInt(req.body.startIndex),
        pageSize = parseInt(req.body.pageSize);

    (new ArticleManager()).findFeedList(searchText, startIndex, pageSize, function(err, result) {
        if(err) {
            return next(err);
        }
        res.json(result.map(function(article){
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
});

router.post('/findByUser', function(req, res, next){
    var findOptions = { _user: req.body.id || (req.user ? req.user._id : null) };

    if(!(req.user && req.user._id.equals(findOptions._user))){
        findOptions.published = true;
    }
    Article.find(findOptions, {}, {sort: {created: -1}}).exec(function(err, articles){
        if(err) {
            return next(err);
        }
        res.json(articles.map(function(article){
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
});

router.post('/setUserRate', checkAuth, function(req, res, next){
    Article.findById(req.body.id, function(err, article){
        if(err) {
            return next(err);
        }
        if(!article) {
            return next(new errors.HttpError(404));
        }
        article.addOrUpdateUserRate(req.user._id, parseInt(req.body.rate));
        article.save(function(err, article){
            if(err) return next(err);
            res.json(Math.round(article.rating));
        });
    });
});

router.post('/getEditDlg', function(req, res, next){
    Article.findById(req.body.id, function(err, article) {
        if(err) {
            return next(err);
        }
        res.render('partials/article/articleEditDlg.ejs', article || new Article({title: '', content: ''}));
    });
});

 /*router.get('/:id', function(req, res, next) {
     'use strict';

     Article.findById(req.params.id, function (err, article) {
         if (err) {
             return next(err);
         }
         if (article && article.published) {
             res.render('article', {
                 article: article,
                 readonly: !(req.user && !article._user.equals(req.user._id))
             });
         } else {
             next(errors.HttpError(404));
         }
     });
 });*/


module.exports = router;