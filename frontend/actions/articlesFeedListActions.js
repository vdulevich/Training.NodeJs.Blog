"use strict";
var actionsNames = require('frontend/constants').actions;


module.exports = {
    fetchArticles: function(context, payload, done){
        context.dispatch(actionsNames.ARTICLES_FEED_REQUEST);
        context.service.create('loadFeedArticles', {}, payload, function(err, response){
            if(err){
                context.dispatch(actionsNames.ARTICLES_FEED_FAILED);
            } else {
                context.dispatch(actionsNames.ARTICLES_FEED_SUCCESS, response);
            }
            done();
        });
    }
};