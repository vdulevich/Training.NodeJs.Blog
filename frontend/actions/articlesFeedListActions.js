"use strict";
var actionsNames = require('frontend/constants').actions;
var ApplicationStore = require('frontend/stores/applicationStore');
var ArticlesStore = require('frontend/stores/articlesStore');
var navigateActions = require('frontend/actions/navigateActions');

var ArticlesFeedListActions = {
    fetchArticles: function(context, payload, done){
        var applicationStore = context.getStore(ApplicationStore);
        var articlesStore = context.getStore(ArticlesStore);
        var searchText = applicationStore.getQuery().search;
        var startIndex = articlesStore.getStartIndex();

        context.dispatch(actionsNames.ARTICLES_FEED_REQUEST);
        context.service.create('loadFeedListArticles', { searchText: searchText, startIndex: startIndex }, {}, function(err, response){
            if(err){
                context.dispatch(actionsNames.ARTICLES_FEED_FAILED);
            } else {
                context.dispatch(actionsNames.ARTICLES_FEED_SUCCESS, response);
            }
            done();
        });
    },
    search: function(context, payload, done){
        context.executeAction(navigateActions.navigate, '/?search=' + payload, function(){
            context.dispatch(actionsNames.ARTICLES_FEED_CLEAR);
            context.executeAction(ArticlesFeedListActions.fetchArticles);
            done();
        });
    }
};

module.exports = ArticlesFeedListActions;