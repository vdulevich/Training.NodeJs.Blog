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

router.post('/create', checkAuth, function(req, res, next){
    var data = req.body;
    data._user = req.user._id;
    (new Article(data)).save(
        function(err, article) {
            if(err) return next(err);
            res.json(article);
    });
});

router.post('/update', checkAuth, function(req, res, next){
    Article.findOneAndUpdate(
        { _id: req.body.id },
        { $set:{ title: req.body.title, content: req.body.content } },
        { 'new': true },
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

router.post('/findByLessThenDate', function(req, res, next){
    var startDate = req.body.startdate,
        startIndex = parseInt(req.body.startIndex),
        pageSize = parseInt(req.body.pageSize);

    Article
        .find({ created: { $lte: startDate }} , { }, { limit: pageSize, skip: startIndex, sort: { created: -1 }})
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
            console.log(articles);
            res.json(articles.map(function(article){
                return {
                    id: article._id,
                    title: article.title,
                    content: article.content.substring(0, 200),
                    author: article._user._profile.fullName,
                    userId: article._user._id,
                    readonly: !(req.user && article._user._id == req.user._id),
                    rating: article.rating,
                    photo: '',
                }
            }));
        });
});

router.post('/findByUser', function(req, res, next){
    Article.find({ _user: req.body.id || req.user }, function(err, articles){
        if(err) return next(err);
        res.json(articles.map(function(article){
            return {
                _id: article._id,
                title: article.title,
                content: article.content.substring(0, 200)
            }
        }));
    })
});

router.post('/setUserRate', checkAuth, function(req, res, next){
    if(!req.user) next(new errors.HttpError(403));
    Article.findById(req.body.id, function(err, article){
        if(err) return next(err);
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
        console.log(article);
        res.render('partials/articleEditDlg.ejs', article);
    });
});

module.exports = router;