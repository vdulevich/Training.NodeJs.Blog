var mongoose = require('lib/mongoose');
var User = require('models/user');
var Article = require('models/article');
var Rate = require('models/rate');
var async = require('async');

async.waterfall([
    function(callback){
        User.findOne({}, callback);
    },
    /*function(user, callback){
        Article.findOne({}, function(err, article){
            article.rates.push({ rate: 0, _user: user._id});
            article.save(callback);
        });
    },*/
    function(user, callback){
        Article.findOne({ 'rates.rate': 4 }, function(err, article){
            article.addOrUpdateUserRate(user._id, 5);
            article.save(callback);
        })
    }
],function(err, result){
    console.log(result);
})





