'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var app = require('frontend/app');
var FluxibleComponent = require('fluxible-addons-react/FluxibleComponent');
var browserHistory = require('react-router').browserHistory;

function RenderApp(appEl, context) {
    ReactDOM.render(React.createElement(FluxibleComponent, { context: context.getComponentContext() }, React.createElement(ReactRouter.Router, { routes: context.getComponent(), history: browserHistory })), appEl);
}

module.exports = function (appEl, dehydratedState) {
    app.rehydrate(dehydratedState || {}, function (err, context) {
        if (err) {
            throw err;
        }
        window.context = context;
        RenderApp(appEl, context);
    });
};