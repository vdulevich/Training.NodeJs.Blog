"use strict";
var actionsNames = require('frontend/constants').actions;
var ApplicationStore = require('frontend/stores/applicationStore');
var ArticlesFeedStore = require('frontend/stores/articlesFeedStore');

var ArticlesFeedListActions = {
    load: function(context, payload, done){
        context.dispatch(actionsNames.ARTICLES_FEED_REQUEST);
        context.service.create('loadArticlesByFeedOptions', payload, {}, function(err, response){
            if(err){
                context.dispatch(actionsNames.ARTICLES_FEED_FAILED);
            } else {
                context.dispatch(actionsNames.ARTICLES_FEED_SUCCESS, response);
            }
            done();
        });
    },
    loadmore: function(context, payload, done){
        var applicationStore = context.getStore(ApplicationStore);
        var articlesStore = context.getStore(ArticlesFeedStore);
        var searchText = applicationStore.getQuery().search;
        var startIndex = articlesStore.getStartIndex();
        context.executeAction(ArticlesFeedListActions.load, { searchText: searchText, startIndex: startIndex }, done);
    },
    search: function(context, payload, done){
        context.dispatch(actionsNames.ARTICLES_FEED_CLEAR);
        context.executeAction(ArticlesFeedListActions.load, { searchText: payload }, done);
    },
    init: function(context, payload, done){
        var articlesStore = context.getStore(ArticlesFeedStore);
        if(!articlesStore.getIsInit()){
            context.executeAction(ArticlesFeedListActions.load, { searchText: ''}, done);
        } else {
            done();
        }
    }
};

module.exports = ArticlesFeedListActions;