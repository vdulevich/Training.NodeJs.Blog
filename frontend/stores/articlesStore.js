"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;


var ArticlesStore = createStore({
    storeName: 'ArticlesStore',
    initialize: function () {
        this.articles = [];
        this.full = false;
        this.loading = false;
        this.pageSize = 5;
    },

    getAll: function(){
        return this.articles;
    },
    getIsFull : function(){
        return this.full;
    },
    getIsLoading: function(){
        return this.loading;
    },
    getStartIndex: function(){
        return this.articles.length > 0 ? this.articles.length : 0;
    },
    _handleFeedListSuccess: function(data) {
        this.full = data.length < this.pageSize;
        this.articles = this.articles.concat(this.full ? data : data.slice(0, data.length - 1));
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
            full: this.full
        };
    },
    rehydrate: function (state) {
        this.articles = state.articles;
        this.full = state.full;
    }
});

ArticlesStore.handlers = {};
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_REQUEST] = '_handleFeedListRequest';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_FAILED] = '_handleFeedListFailed';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_SUCCESS] = '_handleFeedListSuccess';
ArticlesStore.handlers[actionsNames.ARTICLES_FEED_CLEAR] = '_handleFeedListClear';

module.exports = ArticlesStore;