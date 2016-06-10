"use strict";
var actionsNames = require('frontend/constants').actions;

module.exports = {
    loginOpen: function(context, payload, done){
        context.dispatch(actionsNames.AUTH_LOGIN_DIALOG, true);
    },
    signUpOpen:function(context, payload, done){
        context.dispatch(actionsNames.AUTH_SIGUP_DIALOG, true);
    },
    signUpHide:function(context, payload, done){
        context.dispatch(actionsNames.AUTH_SIGUP_DIALOG, false);
    },
    logout: function(context, payload, done){
        context.dispatch(actionsNames.AUTH_LOGOUT_REQUEST);
        context.service.create('logout', {}, payload, function(err, response){
            if(err){
                context.dispatch(actionsNames.AUTH_LOGOUT_FAILED);
            } else {
                context.dispatch(actionsNames.AUTH_LOGOUT_SUCCESS, response);
            }
            done();
        });
    },
    loginHide: function(context, payload, done){
        context.dispatch(actionsNames.AUTH_LOGIN_DIALOG, false);
    },
    login: function(context, payload, done){
        context.dispatch(actionsNames.AUTH_LOGIN_REQUEST);
        context.service.create('login', {}, payload, function(err, response){
            if(err){
                context.dispatch(actionsNames.AUTH_LOGIN_FAILED);
            } else {
                context.dispatch(actionsNames.AUTH_LOGIN_SUCCESS, response);
            }
            done();
        });
    },
    loadUser: function(context, payload, done){
        context.service.create('loadUser', {}, payload, function(err, response){
            if(!err){
                context.dispatch(actionsNames.AUTH_LOGIN_SUCCESS, response);
            } else {
                console.log('Error in loadUser', err);
            }
            done();
        });
    }
};