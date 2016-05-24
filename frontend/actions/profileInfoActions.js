"use strict";
var actionsNames = require('frontend/constants').actions;
var ApplicationStore = require('frontend/stores/applicationStore');
var ProfileInfoStore = require('frontend/stores/profileInfoStore');

var ProfileActions = {
    loadProfile: function(context, payload, done){
        var applicationStore = context.getStore(ApplicationStore);
        var profileInfoStore = context.getStore(ProfileInfoStore);
        var userId = applicationStore.getParams().userId != null ?
            applicationStore.getParams().userId :
            applicationStore.getUserId();

        if(profileInfoStore.getUser()._id !== userId) {
            context.dispatch(actionsNames.PROFILE_INFO_REQUEST);
            context.service.create('loadProfile', { userId: userId }, {}, function (err, response) {
                if (err) {
                    context.dispatch(actionsNames.PROFILE_INFO_FAILED);
                } else {
                    context.dispatch(actionsNames.PROFILE_INFO_SUCCESS, response);
                }
                done();
            });
        } else {
            done();
        }
    },
    loadArticles: function(context, payload, done){
        var applicationStore = context.getStore(ApplicationStore);
        var profileInfoStore = context.getStore(ProfileInfoStore);
        var userId = applicationStore.getParams().userId != null ?
            applicationStore.getParams().userId :
            applicationStore.getUserId();

        if(profileInfoStore.getUser()._id !== userId) {
            context.dispatch(actionsNames.PROFILE_ARTICLES_REQUEST);
            context.service.create('loadArticlesByUserId', { userId: userId }, {}, function (err, response) {
                if (err) {
                    context.dispatch(actionsNames.PROFILE_ARTICLES_FAILED);
                } else {
                    context.dispatch(actionsNames.PROFILE_ARTICLES_SUCCESS, { articles: response, userId : userId});
                }
                done();
            });
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