"use strict";
var actionsNames = require('frontend/constants').actions;
var ProfileInfoStore = require('frontend/stores/profileInfoStore');
var Promise = require("promise");

var ProfileActions = {
    loadProfile: function(context, payload, done){
        context.dispatch(actionsNames.PROFILE_INFO_REQUEST);
        context.service.create('loadProfile', { userId: payload }, {}, function (err, response) {
            if (err) {
                context.dispatch(actionsNames.PROFILE_INFO_FAILED);
            } else {
                context.dispatch(actionsNames.PROFILE_INFO_SUCCESS, response);
            }
            done();
        });
    },
    loadArticles: function(context, payload, done){
        context.dispatch(actionsNames.PROFILE_ARTICLES_REQUEST);
        context.service.create('loadArticlesByUserId', { userId: payload }, {}, function (err, response) {
            if (err) {
                context.dispatch(actionsNames.PROFILE_ARTICLES_FAILED);
            } else {
                context.dispatch(actionsNames.PROFILE_ARTICLES_SUCCESS, { articles: response });
            }
            done();
        });
    },
    load: function(context, payload, done){
        var profileInfoStore = context.getStore(ProfileInfoStore);
        if(profileInfoStore.getUser()._id !== payload) {
            new Promise
                .all([
                    context.executeAction(ProfileActions.loadArticles, payload),
                    context.executeAction(ProfileActions.loadProfile, payload)]
                )
                .then(function(){ done(); })
                .catch(done);
        } else {
            done();
        }
    },
    save: function(context, payload, done){
        context.service.create('saveProfile', payload, {}, function (err, response) {
            if (err) {
                context.dispatch(actionsNames.PROFILE_INFO_FAILED);
            } else {
                context.dispatch(actionsNames.PROFILE_INFO_SUCCESS, response);
            }
            done();
        });
    }
};

module.exports = ProfileActions;