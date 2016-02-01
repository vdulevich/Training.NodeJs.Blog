var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var errors = require('errors');
var checkAuth = require('middleware/checkAuth');
var router = express.Router();
var Article = require('models/article');
var User = require('models/user');


router.get('/:id', function(req, res, next){
    Article.findById(req.params.id, function(err, article){
        if(err) return next(err);
        res.render('article', { article: article });
    })
});

router.post('/save', checkAuth, function(req, res, next){
    req.body._user = req.user._id;
    req.body.published = req.body.published || false;
    Article.findOneAndUpdate(
        { _id: req.body.id },
        { $set: req.body },
        { new: true, upsert: true },
        function(err, article) {
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
        pageSize = parseInt(req.body.pageSize),
        findOptions = { published : true };

    if(searchText){
        findOptions.title = new RegExp(searchText, "i");
    }
    Article
        .find(
            findOptions,
            { },
            { limit: pageSize, skip: startIndex, sort: { created: -1 }}
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
        .exec(function(err, articles){
            if(err) return next(err);
            res.json(articles.map(function(article){
                return {
                    id: article._id,
                    title: article.title,
                    content: article.content.substring(0, 200),
                    author: article._user._profile.fullName,
                    userId: article._user._id,
                    readonly: !(req.user && article._user._id.equals(req.user._id)),
                    rating: article.rating,
                    comments: article._comments.length,
                    created: article.created
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
                content: article.content.substring(0, 200),
                published: article.published
            }
        }));
    })
});

router.post('/setUserRate', checkAuth, function(req, res, next){
    if(!req.user) next(new errors.HttpError(403));
    Article.findById(req.body.id, function(err, article){
        if(err) return next(err);
        if(!article) return next(new errors.HttpError(404));
        article.addOrUpdateUserRate(req.user._id, parseInt(req.body.rate));
        article.save(function(err, article){
            if(err) return next(err);
            res.json(article.rating);
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