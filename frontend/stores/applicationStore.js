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
        this.route = { params : route.params, location: route.location };
        this.emitChange();
    },
    _handleLoginSuccess: function(data){
        this.user = data;
        this.emitChange();
    },
    _handleLogoutSuccess:function(){
        this.user = null;
        this.emitChange();
    },
    _handleSave: function(payload){

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
ApplicationStore.handlers[actionsNames.AUTH_SIGNUP_SUCCESS] = '_handleLoginSuccess';
ApplicationStore.handlers[actionsNames.AUTH_LOGOUT_SUCCESS] = '_handleLogoutSuccess';
ApplicationStore.handlers[actionsNames.SAVE] = "_handleSave";

module.exports = ApplicationStore;