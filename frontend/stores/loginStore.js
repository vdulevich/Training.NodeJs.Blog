"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;


var LoginStore = createStore({
    storeName: 'LoginStore',

    initialize: function () {
        this.loggedUser = null;
        this.loginState = null;
        this.loginOpened = false;
    },
    _handleLoginDialog: function(state){
        this.loginOpened = state;
        this.emitChange();
    },
    _handleLoginRequest: function(){
        this.loginState = 'pending';
        this.emitChange();
    },
    _handleLoginSuccess: function(data){
        this.loggedUser = data;
        this.loginState = 'success';
        this.loginOpened = false;
        this.emitChange();
    },
    _handleLoginFailed: function(){
        this.loginState = 'failed';
        this.emitChange();
    },
    getLoggedUser : function() {
        return this.loggedUser;
    },
    getLoginState : function(){
        return this.loginState;
    },
    getLoginOpen : function(){
        return this.loginOpened;
    },
    dehydrate: function () {
        return {
            loggedUser: this.loggedUser,
            loginState: this.loginState,
            loginOpened: this.loginOpened
        };
    },
    rehydrate: function (state) {
        this.loggedUser = state.loggedUser;
        this.loginState = state.loginState;
        this.loginOpened = state.loginOpened;
    }
});

LoginStore.handlers = {};
LoginStore.handlers[actionsNames.AUTH_LOGIN_SUCCESS] = '_handleLoginSuccess';
LoginStore.handlers[actionsNames.AUTH_LOGIN_FAILED] = '_handleLoginFailed';
LoginStore.handlers[actionsNames.AUTH_LOGIN_DIALOG] = '_handleLoginDialog';
LoginStore.handlers[actionsNames.AUTH_LOGIN_REQUEST] = '_handleLoginRequest';

module.exports = LoginStore;
