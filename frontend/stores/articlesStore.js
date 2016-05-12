"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;


var ArticlesStore = createStore({
    storeName: 'ArticlesStore',
    initialize: function () {
        this.articles = [];
        this.full = false;
    },

    getAll: function(){
        return this.articles;
    },
    getIsFull : function(){
        return this.full;
    },
    _handleFeedListSuccess: function(data) {
        this.articles = data;
        this.emitChange();
    },
    _handleFeedListFailed: function(){

    },
    _handleFeedListRequest: function(){

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

module.exports = ArticlesStore;

/*ArticlesFeedListStore.prototype.getAll = function(){
    return this._articles;
}

ArticlesFeedListStore.prototype.getIsFull = function(){
    return this._full;
}

ArticlesFeedListStore.prototype.getSearchText = function(){
    return this._searchText;
}

ArticlesFeedListStore.prototype.receiveArticles = function(data){
    this._full = data.length < this._pageSize;
    this._articles = this._articles.concat(this._full ? data : data.slice(0, data.length - 1));
}

ArticlesFeedListStore.prototype.loadMoreArticles = function(data){
    this._searchText = data === undefined ? this._searchText : data;
    actionCreator.fetchArticles(
        this._searchText,
        this._articles.length,
        this._pageSize);
}

ArticlesFeedListStore.prototype.handleActions = function(action){
    switch (action.type) {
        case actionsTypes.ARTICLES_FEED_RECEIVE:
            this.receiveArticles(action.data);
            this.emit("changed");
            break;
        case actionsTypes.ARTICLES_FEED_LOADMORE:
            this.loadMoreArticles(action.data);
            this.emit("loading");
            break;
        case actionsTypes.ARTICLES_FEED_SEARCH:
            if(this._searchText !== action.data) {
                this.init();
                this.loadMoreArticles(action.data);
                this.emit("changed");
            }
            break;
    }
};
var articlesFeedListStore =  new ArticlesFeedListStore();
ArticlesFeedListStore.dispatchToken = dispatcher.register(articlesFeedListStore.handleActions.bind(articlesFeedListStore));


module.exports = articlesFeedListStore;*/