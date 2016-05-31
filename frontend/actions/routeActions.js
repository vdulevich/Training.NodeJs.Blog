"use strict";
var actionsNames = require('frontend/constants').actions;
var articlesFeedActions = require("frontend/actions/articlesFeedActions");
var profileInfoActions = require('frontend/actions/profileInfoActions');
var articleViewActions = require('frontend/actions/articleViewActions');
var ApplicationStore = require('frontend/stores/applicationStore');

var RouteActions = {
    change: function (context, payload, done) {
        context.dispatch(actionsNames.CHANGE_ROUTE, payload);
        switch (payload.routes[2].name)
        {
            case "index":
                if(payload.location.query.search != null){
                    context.executeAction(articlesFeedActions.search, payload.location.query.search, done);
                } else {
                    context.executeAction(articlesFeedActions.init, {}, done);
                }
                break;
            case "profile":
                context.executeAction(profileInfoActions.load, payload.params.userId, done);
                break;
            case "article":
                context.executeAction(articleViewActions.load, payload.params.articleId, done);
                break;
            default:
                done();
        }
    },
    reload: function(context, payload, done){
        var applicationStore = context.getStore(ApplicationStore);
        context.executeAction(RouteActions.change, applicationStore.getState().route);
    }
};

module.exports = RouteActions;