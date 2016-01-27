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
    Article.update({ _id: req.body.id }, { $set: { title: req.body.title, content: req.body.content }},
        function(err, article) {
            if(err) return next(err);
            res.end('');
        });
});

router.post('/delete', function(req, res, next){
    Article.remove({_id: req.body.id, _user: req.user },
        function(err) {
            if(err) return next(err);
            res.end('');
        });
});

router.post('/getList', function(req, res, next){
    Article.find({ _user: req.user }, function(err, articles){
        if(err) return next(err);
        res.render('partials/articlesList.ejs', { articles: articles });
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