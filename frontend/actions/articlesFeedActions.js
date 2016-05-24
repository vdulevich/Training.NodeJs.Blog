"use strict";
var actionsNames = require('frontend/constants').actions;
var ApplicationStore = require('frontend/stores/applicationStore');
var ArticlesFeedStore = require('frontend/stores/articlesFeedStore');
var browserHistory = require('react-router').browserHistory;

var ArticlesFeedListActions = {
    load: function(context, payload, done){
        var applicationStore = context.getStore(ApplicationStore);
        var articlesStore = context.getStore(ArticlesFeedStore);
        var searchText = applicationStore.getQuery().search;
        var startIndex = articlesStore.getStartIndex();

        context.dispatch(actionsNames.ARTICLES_FEED_REQUEST);
        context.service.create('loadFeed', { searchText: searchText, startIndex: startIndex }, {}, function(err, response){
            if(err){
                context.dispatch(actionsNames.ARTICLES_FEED_FAILED);
            } else {
                context.dispatch(actionsNames.ARTICLES_FEED_SUCCESS, response);
            }
            done();
        });
    },
    search: function(context, payload, done){
        browserHistory.push('/?search=' + payload);
        context.dispatch(actionsNames.ARTICLES_FEED_CLEAR);
        context.executeAction(ArticlesFeedListActions.load, {}, done);
    },
    init: function(context, payload, done){
        var articlesStore = context.getStore(ArticlesFeedStore);
        if(!articlesStore.getAll()){
            context.executeAction(ArticlesFeedListActions.load, {}, done);
        }
    }
};

module.exports = ArticlesFeedListActions;