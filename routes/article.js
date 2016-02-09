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


router.get('/:id', function(req, res, next){
    Article.findById(req.params.id, function(err, article){
        if(err) return next(err);
        if(article) {
            res.render('article',
                {
                    article: article,
                    readonly: !(req.user && !article._user.equals(req.user._id))
                });
        } else {
            next(errors.HttpError(404))
        }
    })
});


router.post('/save', checkAuth , upload.single('background'), function(req, res, next) {
    req.body._user = req.user._id;
    req.body.published = req.body.published || false;
    if(req.file && req.file.path) {
        req.body.backgroundPath = req.file.path;
        req.body.backgroundFileName = req.file.originalname;
    }
    async.waterfall([
        function(callback){
            Article.findById(req.body._id, callback)
        },
        function(oldArticle, callback){
            if(!oldArticle){
                (new Article(req.body)).save(function(err, newArticle){
                    if(err) return callback(err);
                    callback(null, oldArticle, newArticle);
                });
            } else if(oldArticle._user.equals(req.user._id)) {
                Article.findOneAndUpdate(
                    { _id: req.body._id },
                    { $set: req.body },
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
                require('fs').unlink(oldArticle.backgroundPath, function(){
                    callback(null, newArticle);
                });
            } else {
                callback(null, newArticle);
            }
        }
    ], function(err, article){
        if(err) return next(err);
        res.json(article);
    });
});

router.post('/delete', checkAuth, function(req, res, next){
    Article.remove({_id: req.body.id, _user: req.user },
        function(err) {
            if(err) return next(err);
            res.end('');
        });
});

router.post('/findFeedList', function(req, res, next){
    var searchText = req.body.searchText,
        startIndex = parseInt(req.body.startIndex);

    (new ArticleManager()).findFeedList(searchText, startIndex, req.user, function(err, result) {
        if(err) next(err);
        res.json(result);
    })
});

router.post('/findByUser', function(req, res, next){
    var findOptions = { _user: req.body.id || req.user };
    if(!(req.user && req.user._id.equals(req.body.id))){
        findOptions.published = true;
    }
    Article.find(findOptions, {}, {sort: {created: -1}}).exec(function(err, articles){
        if(err) return next(err);
        res.json(articles.map(function(article){
            return {
                _id: article._id,
                title: article.title,
                content: article.content ? article.content.substring(0, 200) : '',
                published: article.published && (req.user && article._user.equals(req.user._id)),
                readonly:!(req.user && article._user.equals(req.user._id)),
                rating: article.rating,
                comments: article._comments.length,
                created: article.created,
                backgroundPath: article.backgroundPath || '',
                backgroundStyle: article.backgroundStyle || ''
            }
        }));
    });
});

router.post('/setUserRate', checkAuth, function(req, res, next){
    Article.findById(req.body.id, function(err, article){
        if(err) return next(err);
        if(!article) return next(new errors.HttpError(404));
        article.addOrUpdateUserRate(req.user._id, parseInt(req.body.rate));
        console.log(article.rating);
        article.save(function(err, article){
            if(err) return next(err);
            res.json(Math.round(article.rating));
        });
    })
});

router.post('/getEditDlg', function(req, res, next){
    Article.findById(req.body.id, function(err, article) {
        if(err) return next(err);
        res.render('partials/articleEditDlg.ejs', article || new Article({title: '', content: ''}));
    });
});

module.exports = router;