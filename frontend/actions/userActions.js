"use strict";
var actionsNames = require('frontend/constants').actions;

module.exports = {
    load: function(context, payload, done){
        context.service.create('loadUser', payload, {}, function(err, response){
            if(!err){
                context.dispatch(actionsNames.AUTH_LOGIN_SUCCESS, response);
            }
            done();
        });
    }
};