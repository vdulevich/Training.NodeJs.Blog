"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var ProfileInfoStore = createStore({
    storeName:'ProfileInfoStore',

    initialize: function () {
        this.articles = [];
        this.user = {};
        this.profile = {};
        this.loading = {
            profile: false,
            articles: false
        };
    },
    _handleProfileArticlesSuccess: function(payload){
        this.articles = payload.articles;
        this.loading.articles = false;
        this.emitChange();
    },
    _handleProfileArticlesRequest: function(){
        this.loading.articles = true;
        this.emitChange();
    },
    _handleProfileInfoRequest: function(){
        this.loading.profile = true;
        this.emitChange();
    },
    _handleProfileInfoSuccess: function(payload){
        this.profile = payload;
        this.user = payload._user;
        this.loading.profile = false;
        this.emitChange();
    },
    getIsLoading: function(){
        return this.loading;
    },
    getProfile: function() {
        return this.profile;
    },
    getUser: function(){
        return this.user;
    },
    getArticles: function(){
        return this.articles;
    },
    dehydrate: function(){
        return {
            articles: this.articles,
            user: this.user,
            profile: this.profile
        };
    },
    rehydrate: function(state){
        this.articles = state.articles;
        this.userId = state.user;
        this.profile = state.profile;
    }
});

ProfileInfoStore.handlers = {};
ProfileInfoStore.handlers[actionsNames.PROFILE_ARTICLES_SUCCESS] = "_handleProfileArticlesSuccess";
ProfileInfoStore.handlers[actionsNames.PROFILE_ARTICLES_REQUEST] = "_handleProfileArticlesRequest";
ProfileInfoStore.handlers[actionsNames.PROFILE_INFO_SUCCESS] = "_handleProfileInfoSuccess";
ProfileInfoStore.handlers[actionsNames.PROFILE_INFO_REQUEST] = "_handleProfileInfoRequest";

module.exports = ProfileInfoStore;