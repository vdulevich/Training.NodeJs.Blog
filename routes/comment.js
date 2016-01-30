var mongoose = require('lib/mongoose');
var async = require('async');
var express = require('express');
var checkAuth = require('middleware/checkAuth');
var router = express.Router();
var Comment = require('models/comment');


router.post('/create', checkAuth, function(req, res, next){
    var data = req.body;
    data._user = req.user._id;
    async.waterfall([
        function(callback){
            (new Comment(data)).save(function(err, comment){
                if(err) return callback(err);
                callback(null, comment);
            });
        },
        function(comment, callback) {
            Comment.populate(comment, {
                path: '_user',
                model: 'User',
                select: '_profile',
                populate: {
                    path: '_profile',
                    model: 'Profile',
                    select: 'firstName lastName'
                }
            }, callback)
        }
    ],function(err, comment){
        if(err) return next(err);
        res.json(comment);
    })
});

router.post('/findByArticleId', function(req, res, next){
    Comment
        .find({_article: req.body._id })
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
        .exec(
            function(err, comments){
            if(err) return next(err);
            res.json(comments);
        });
});

module.exports = router;