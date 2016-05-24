"use strict";
var Promise = require("promise");
var articlesFeedActions = require('frontend/actions/articlesFeedActions');
var authActions = require('frontend/actions/authActions');

var actions = {
    loadData: function(context, payload, done){
        var loadUser = new Promise(function(resolve, reject) {
            context.executeAction(authActions.loadUser, {}, resolve);
        });
        var loadFeedList = new Promise(function(resolve, reject) {
            context.executeAction(articlesFeedActions.load, {}, resolve);
        });
        Promise.all([loadUser, loadFeedList]).then(function(){ done(); }).catch(done);
    }
};

module.exports = actions;