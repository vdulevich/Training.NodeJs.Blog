"use strict";
var Promise = require("promise");
var actionsNames = require('frontend/constants').actions;
var ProfileInfoStore = require('frontend/stores/profileInfoStore');

var ProfileInfoActions = {
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
                    context.executeAction(ProfileInfoActions.loadArticles, payload),
                    context.executeAction(ProfileInfoActions.loadProfile, payload)]
                )
                .then(function(){ done(); })
                .catch(done);
        } else {
            done();
        }
    },
    save: function(context, payload, done) {
        context.dispatch(actionsNames.SAVE, { entity: "profile", id: payload._id });
        context.service.create('saveProfile', payload, {}, function (err, response) {
            if (err) {
                context.dispatch(actionsNames.PROFILE_INFO_FAILED);
                done();
            } else {
                context.dispatch(actionsNames.PROFILE_INFO_SUCCESS, response);
                ProfileInfoActions.loadArticles(context, response._user._id, done);
            }
        });
    }
};

module.exports = ProfileInfoActions;