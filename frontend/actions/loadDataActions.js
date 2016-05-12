"use strict";
var Promise = require("promise");
var fetchArticles = require('frontend/actions/articlesFeedListActions').fetchArticles;
var actionsNames = require('frontend/constants').actions;


var actions = {
    loadData: function(context, payload, done){
        var loadUserPromise = new Promise(function(resolve, reject) {
            context.executeAction(actions.loadUser, {}, resolve);
        });
        var loadFeedList = new Promise(function(resolve, reject) {
            context.executeAction(fetchArticles, {}, resolve);
        });
        Promise.all([loadUserPromise, loadFeedList]).then(function(){ done(); });
    },
    loadUser: function(context, payload, done){
        context.service.read('loadUser', {}, payload, function(err, response){
            if(!err){
                context.dispatch(actionsNames.AUTH_LOGIN_SUCCESS, response);
            }
            done();
        });
    }
};

module.exports = actions;