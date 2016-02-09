var express = require('express');
var router = express.Router();
var ArticleManager = require('managers/articleManager');

router.get('/', function(req, res, next){
    res.render('index', {
        searchText : ''
    });
});


router.get('/search/:text', function(req, res, next){
    res.render('index',{
        searchText : req.params.text
    });
});


module.exports = router;