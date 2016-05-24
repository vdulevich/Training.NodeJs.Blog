'use strict';
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    initialize: function () {
        this.route = null;
        this.user = null;
        this.profile = null;
    },
    _handleNavigate: function (route) {
        this.route = route;
        this.emitChange();
    },
    _handleLoginSuccess: function(data){
        this.user = data;
        this.emitChange();
    },
    getParams: function(){
        return this.route ? this.route.params : {};
    },
    getQuery: function(){
        return this.route ? this.route.location.query : {};
    },
    getUser : function() {
        return this.user;
    },
    getUserId: function(){
        return this.user !== null ? this.user._id: null;
    },
    getState: function () {
        return {
            route: this.route,
            user: this.user,
            profile: this.profile
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.route = state.route;
        this.user = state.user;
        this.profile = state.profile;
    }
});

ApplicationStore.handlers = {};
ApplicationStore.handlers[actionsNames.CHANGE_ROUTE] = '_handleNavigate';
ApplicationStore.handlers[actionsNames.AUTH_LOGIN_SUCCESS] = '_handleLoginSuccess';

module.exports = ApplicationStore;