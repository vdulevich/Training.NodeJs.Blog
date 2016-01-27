var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var router = express.Router();
var Article = require('models/article');

router.post('/create', function(req, res, next){
    Article.create(
        req.body.title,
        req.body.content,
        req.session.user,
        function(err, article) {
            if(err) return next(err);
            res.json(article);
    });
});

router.post('/update', function(req, res, next){
    Article.findOneAndUpdate(
        { _id: req.body.id },
        { $set:{ title: req.body.title, content: req.body.content } },
        { 'new': true },
        function(err, article) {
            if(err) return next(err);
            res.json(article);
        });
});

router.post('/delete', function(req, res, next){
    Article.remove({_id: req.body.id, _user: req.user },
        function(err) {
            if(err) return next(err);
            res.end('');
        });
});

router.post('/find', function(req, res, next){
    Article.find({ _user: req.user }, function(err, articles){
        if(err) return next(err);
        res.json(articles);
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