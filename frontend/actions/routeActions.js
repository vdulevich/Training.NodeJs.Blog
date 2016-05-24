"use strict";
var actionsNames = require('frontend/constants').actions;

module.exports = {
    changeRoute: function (context, payload, done) {
        context.dispatch(actionsNames.CHANGE_ROUTE, payload);
        done();
    }
};