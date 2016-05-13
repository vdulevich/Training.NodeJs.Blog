"use strict";
var actionsNames = require('frontend/constants').actions;
var browserHistory = require('react-router').browserHistory;


module.exports = {
    navigate: function(context, payload, done){
        browserHistory.push(payload);
        done();
    },
    changeRoute: function (context, payload, done) {
        context.dispatch(actionsNames.CHANGE_ROUTE, payload);
        done();
    }
};