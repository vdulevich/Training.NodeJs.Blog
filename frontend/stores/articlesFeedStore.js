"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var ArticlesStore = createStore({
    storeName: 'ArticlesFeedStore',
    initialize: function () {
        this.articles = [];
        this.startIndex = 0;
        this.loaded = false;
        this.loading = false;
        this.pageSize = 5;
    },
    getAll: function(){
        return this.articles;
    },
    getIsLoaded : function(){
        return this.loaded;
    },
    getIsLoading: function(){
        return this.loading;
    },
    getStartIndex: function(){
        return this.startIndex;
    },
    _handleFeedListSuccess: function(data) {
        this.loaded = data.length < this.pageSize;
        this.articles = this.articles.concat(this.loaded ? data : data.slice(0, data.length - 1));
        this.startIndex = this.articles.length;
        this.loading = false;
        this.emitChange();
    },
    _handleFeedListFailed: function(){
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
    dehydrate: function () {
        return {
            articles: this.articles,
            loaded: this.loaded,
            loading: this.loading,
            startIndex: this.startIndex
        };
    },
    rehydrate: function (state) {
        this.articles = state.articles;
        this.loaded = state.loaded;
        this.loading = state.loading;
        this.startIndex = state.startIndex;
    }
});

ArticlesStore.handlers = {};
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_REQUEST] = '_handleFeedListRequest';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_FAILED] = '_handleFeedListFailed';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_SUCCESS] = '_handleFeedListSuccess';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_CLEAR] = '_handleFeedListClear';

module.exports = ArticlesStore;