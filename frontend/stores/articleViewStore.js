"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var ArticleViewStore = createStore({
    storeName: 'ArticleViewStore',
    initialize: function () {
        this.article = {};
        this.comments = [];
        this.loading = {
            comments: false,
            article: false
        };
    },
    _handleArticleSuccess: function(data) {
        this.article = data;
        this.loading.article = false;
        this.emitChange();
    },
    _handleArticleFailed: function(){
        this.loading.article = false;
        this.emitChange();
    },
    _handleArticleRequest: function(){
        this.loading.article = true;
        this.emitChange();
    },
    _handleCommentsRequest: function(){
        this.loading.comments = true;
        this.emitChange();
    },
    _handleCommentsFailed: function(){
        this.loading.comments = false;
        this.emitChange();
    },
    _handleCommentsSuccess: function(data){
        this.loading.comments = false;
        this.comments = data;
        this.emitChange();
    },
    _handleCommentSaveSuccess:function(data){
        this.comments.push(data);
        this.emitChange();
    },
    _handleSave: function(payload){
        if(payload.entity === "profile") {
            this.initialize();
            this.emitChange();
        }
    },
    getState: function(){
        return {
            article: this.article,
            loading: this.loading,
            comments: this.comments
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.article = state.article;
        this.loading = state.loading;
        this.comments = state.comments;
    }
});

ArticleViewStore.handlers = {};
ArticleViewStore.handlers[actionsNames.ARTICLE_LOAD_REQUEST] = '_handleArticleRequest';
ArticleViewStore.handlers[actionsNames.ARTICLE_LOAD_FAILED] = '_handleArticleFailed';
ArticleViewStore.handlers[actionsNames.ARTICLE_LOAD_SUCCESS] = '_handleArticleSuccess';

ArticleViewStore.handlers[actionsNames.COMMENTS_LOAD_REQUEST] = '_handleCommentsRequest';
ArticleViewStore.handlers[actionsNames.COMMENTS_LOAD_FAILED] = '_handleCommentsFailed';
ArticleViewStore.handlers[actionsNames.COMMENTS_LOAD_SUCCESS] = '_handleCommentsSuccess';

ArticleViewStore.handlers[actionsNames.COMMENT_SAVE_REQUEST] = '_handleCommentsRequest';
ArticleViewStore.handlers[actionsNames.COMMENT_SAVE_FAILED] = '_handleCommentsFailed';
ArticleViewStore.handlers[actionsNames.COMMENT_SAVE_SUCCESS] = '_handleCommentSaveSuccess';

ArticleViewStore.handlers[actionsNames.SAVE] = "_handleSave";

module.exports = ArticleViewStore;