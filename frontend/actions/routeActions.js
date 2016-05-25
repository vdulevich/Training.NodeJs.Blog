"use strict";
var actionsNames = require('frontend/constants').actions;
var articlesFeedActions = require("frontend/actions/articlesFeedActions");
var profileInfoActions = require('frontend/actions/profileInfoActions');

module.exports = {
    changeRoute: function (context, payload, done) {
        context.dispatch(actionsNames.CHANGE_ROUTE, payload);
        switch (payload.routes[2].name)
        {
            case "index":
                if(payload.location.query.search != null){
                    context.executeAction(articlesFeedActions.search, payload.location.query.search, done);
                } else {
                    context.executeAction(articlesFeedActions.load, {}, done);
                }
                break;
            case "profile":
                if(payload.params.userId != null){
                    context.executeAction(profileInfoActions.load, payload.params.userId, done);
                }
                break;
            case "article":
                done();
                break;
            default:
                done();
        }
    }
};