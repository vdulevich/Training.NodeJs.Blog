"use strict";
var Promise = require("promise");
var actionsNames = require('frontend/constants').actions;
var ArticleViewStore = require('frontend/stores/articleViewStore');

var ArticleViewActions = {
    loadArticle: function(context, payload, done){
        context.dispatch(actionsNames.ARTICLE_LOAD_REQUEST);
        context.service.create('loadArticlesById', {id : payload}, {}, function(err, response){
            if(err){
                context.dispatch(actionsNames.ARTICLE_LOAD_FAILED);
            } else {
                context.dispatch(actionsNames.ARTICLE_LOAD_SUCCESS, response);
            }
            done();
        });
    },
    loadComments: function(context, payload, done){
        context.dispatch(actionsNames.COMMENTS_LOAD_REQUEST);
        context.service.create('loadCommentsByArticleId', {id : payload}, {}, function(err, response){
            if(err){
                context.dispatch(actionsNames.COMMENTS_LOAD_FAILED);
            } else {
                context.dispatch(actionsNames.COMMENTS_LOAD_SUCCESS, response);
            }
            done();
        });
    },
    load: function(context, payload, done){
        var articleViewStore = context.getStore(ArticleViewStore);
        if(articleViewStore.getState().article._id !== payload) {
            new Promise.all([
                context.executeAction(ArticleViewActions.loadArticle, payload),
                context.executeAction(ArticleViewActions.loadComments, payload)
            ])
            .then(function(){ done(); })
            .catch(done);
        } else {
            done();
        }
    },
    saveComment: function(context, payload, done){
        context.dispatch(actionsNames.SAVE, { entity: "comment", id: payload._id });
        context.dispatch(actionsNames.COMMENT_SAVE_REQUEST);
        context.service.create('saveComment', payload, {}, function (err, response) {
            if (err) {
                context.dispatch(actionsNames.COMMENT_SAVE_FAILED);
            } else {
                context.dispatch(actionsNames.COMMENT_SAVE_SUCCESS, response);
            }
            done();
        });
    },
    saveArticle:function(context, payload, done){
        context.dispatch(actionsNames.SAVE, { entity: "article", id: payload._id });
        context.dispatch(actionsNames.ARTICLE_SAVE_REQUEST);
        context.service.create('saveArticle', payload, {}, function (err, response) {
            if (err) {
                context.dispatch(actionsNames.ARTICLE_SAVE_FAILED);
            } else {
                context.dispatch(actionsNames.ARTICLE_SAVE_SUCCESS, response);
            }
            done();
        });
    }
};

module.exports = ArticleViewActions;