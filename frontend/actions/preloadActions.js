"use strict";
var Promise = require("promise");
var articlesFeedActions = require('frontend/actions/articlesFeedActions');
var authActions = require('frontend/actions/authActions');

var actions = {
    loadData: function(context, payload, done){
        Promise.all([
            context.executeAction(authActions.loadUser, {}),
            context.executeAction(articlesFeedActions.load, {})])
        .then(function(){ done(); }).catch(done);
    }
};

module.exports = actions;