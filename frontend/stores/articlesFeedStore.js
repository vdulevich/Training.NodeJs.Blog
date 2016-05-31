"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var ArticlesStore = createStore({
    storeName: 'ArticlesFeedStore',
    initialize: function () {
        this.articles = [];
        this.isFull = false;
        this.loading = false;
        this.pageSize = 5;
        this.init = false;
    },
    getAll: function(){
        return this.articles;
    },
    getIsInit: function(){
        return this.init;
    },
    getIsFull : function(){
        return this.isFull;
    },
    getIsLoading: function(){
        return this.loading;
    },
    getStartIndex: function(){
        return this.articles.length;
    },
    _handleFeedListSuccess: function(data) {
        this.init = true;
        this.isFull = data.length < this.pageSize;
        this.articles = this.articles.concat(this.isFull ? data : data.slice(0, data.length - 1));
        this.loading = false;
        this.emitChange();
    },
    _handleFeedListFailed: function(){
        this.init = true;
        this.loading = false;
        this.emitChange();
    },
    _handleFeedListRequest: function(){
        this.loading = true;
        this.emitChange();
    },
    _handleFeedListClear: function(){
        this.initialize();
        this.emitChange();
    },
    _handleSave: function(payload){
        if(payload.entity === "profile") {
            this.initialize();
            this.emitChange();
        }
    },
    dehydrate: function () {
        return {
            articles: this.articles,
            isFull: this.isFull,
            loading: this.loading,
            init : this.init
        };
    },
    rehydrate: function (state) {
        this.articles = state.articles;
        this.isFull = state.isFull;
        this.loading = state.loading;
        this.init = state.init;
    }
});

ArticlesStore.handlers = {};
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_REQUEST] = '_handleFeedListRequest';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_FAILED] = '_handleFeedListFailed';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_SUCCESS] = '_handleFeedListSuccess';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_CLEAR] = '_handleFeedListClear';
ArticlesStore.handlers[actionsNames.SAVE] = "_handleSave";

module.exports = ArticlesStore;