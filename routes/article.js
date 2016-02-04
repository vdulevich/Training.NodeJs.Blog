var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var errors = require('errors');
var checkAuth = require('middleware/checkAuth')
var multer = require('multer');
var upload  = multer({ dest: 'public/articlesbg' });
var router = express.Router();
var Profile = require('models/profile');
var Article = require('models/article');
var User = require('models/user');


router.get('/:id', function(req, res, next){
    Article.findById(req.params.id, function(err, article){
        if(err) return next(err);
        res.render('article',
            {
                article: article,
                readonly: !(req.user && !article._user.equals(req.user._id))
            });
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
                Article.findByIdAndUpdate(
                    { _id: req.body._id },
                    { $set: req.body },
                    { new: true },
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
            if(oldArticle && oldArticle.backgroundPath != newArticle.backgroundPath){
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
        startIndex = parseInt(req.body.startIndex),
        pageSize = parseInt(req.body.pageSize);
    async.waterfall([
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
                    { '_user': { $in: profiles.map(function(profiles){ return profiles._user }) } }
                ]
            }
            Article
                .find(
                    findOptions,
                    {},
                    {limit: pageSize, skip: startIndex, sort: {created: -1}}
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
                }).exec(callback)
        }
    ],
    function(err, articles){
        if(err) return next(err);
        res.json(articles.map(function(article){
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
                backgroundStyle: article.backgroundStyle
            }
        }));
    });
});

router.post('/findByUser', function(req, res, next){
    var findOptions = { _user: req.body.id || req.user };
    if(!(req.user && req.user._id.equals(req.body.id))){
        findOptions.published = true;
    }
    Article.find(findOptions, function(err, articles){
        if(err) return next(err);
        res.json(articles.map(function(article){
            return {
                _id: article._id,
                title: article.title,
                content: article.content ? article.content.substring(0, 200) : '',
                published: article.published
            }
        }));
    })
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