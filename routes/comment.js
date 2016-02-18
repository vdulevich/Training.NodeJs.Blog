var express = require('express');
var checkAuth = require('middleware/checkAuth');
var router = express.Router();
var Comment = require('models/comment');
var CommentManager = require('managers/commentManager');


router.post('/create', checkAuth, function(req, res, next){
    var data = req.body;
    data._user = req.user._id;

    (new CommentManager()).create(data, function(err, comment){
        if(err) {
            return next(err);
        }
        res.json(comment);
    });
});

router.post('/findByArticleId', function(req, res, next){
    (new CommentManager()).findByArticleId(req.body._id, function(err, comments) {
        if(err) {
            return next(err);
        }
        res.json(comments);
    });
});

module.exports = router;