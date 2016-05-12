"use strict";
var actionsNames = require('frontend/constants').actions;


module.exports = {
    loginOpen: function(context, payload, done){
        context.dispatch(actionsNames.AUTH_LOGIN_DIALOG, true);
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
    }
};