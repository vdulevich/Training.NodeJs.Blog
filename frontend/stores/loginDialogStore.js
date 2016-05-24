"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var LoginStore = createStore({
    storeName: 'LoginStore',

    initialize: function () {
        this.state = null;
        this.opened = false;
    },
    _handleLoginDialog: function(state){
        this.opened = state;
        this.emitChange();
    },
    _handleLoginRequest: function(){
        this.state = 'pending';
        this.emitChange();
    },
    _handleLoginSuccess: function(data){
        this.state = 'success';
        this.opened = false;
        this.emitChange();
    },
    _handleLoginFailed: function(){
        this.state = 'failed';
        this.emitChange();
    },
    getLoginState : function(){
        return this.state;
    },
    getLoginOpen : function(){
        return this.opened;
    },
    dehydrate: function () {
        return {
            state: this.state,
            opened: this.opened
        };
    },
    rehydrate: function (state) {
        this.state = state.state;
        this.opened = state.opened;
    }
});

LoginStore.handlers = {};
LoginStore.handlers[actionsNames.AUTH_LOGIN_SUCCESS] = '_handleLoginSuccess';
LoginStore.handlers[actionsNames.AUTH_LOGIN_FAILED] = '_handleLoginFailed';
LoginStore.handlers[actionsNames.AUTH_LOGIN_DIALOG] = '_handleLoginDialog';
LoginStore.handlers[actionsNames.AUTH_LOGIN_REQUEST] = '_handleLoginRequest';

module.exports = LoginStore;
