"use strict";
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var SignupDialogStore = createStore({
    storeName: 'SignupStore',

    initialize: function () {
        this.state = null;
        this.opened = false;
    },
    _handleSignupDialog: function(state){
        this.opened = state;
        this.emitChange();
    },
    _handleSignupRequest: function(){
        this.state = 'pending';
        this.emitChange();
    },
    _handleSignupSuccess: function(data){
        this.state = 'success';
        this.opened = false;
        this.emitChange();
    },
    _handleSignupFailed: function(){
        this.state = 'failed';
        this.emitChange();
    },
    getState : function(){
        return {
            state : this.state,
            opened: this.opened
        };
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

SignupDialogStore.handlers = {};
SignupDialogStore.handlers[actionsNames.AUTH_SIGNUP_SUCCESS] = '_handleSignupSuccess';
SignupDialogStore.handlers[actionsNames.AUTH_SIGNUP_FAILED] = '_handleSignupFailed';
SignupDialogStore.handlers[actionsNames.AUTH_SIGNUP_DIALOG] = '_handleSignupDialog';
SignupDialogStore.handlers[actionsNames.AUTH_SIGNUP_REQUEST] = '_handleSignupRequest';

module.exports = SignupDialogStore;
