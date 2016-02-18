var express = require('express');
var router = express.Router();


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