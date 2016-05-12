'use strict';

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var blogApp = require('frontend/components/blogApp');
var IndexPage = require('frontend/pages/index');
var ArticlePage = require('frontend/pages/article');
var articlesFeedListActions = require("frontend/actions/articlesFeedListActions");

module.exports = React.createElement(
    Router,
    { history: browserHistory },
    React.createElement(
        Route,
        { path: '/', component: blogApp },
        React.createElement(IndexRoute, { component: IndexPage }),
        React.createElement(Route, { path: 'article/:articleId', component: ArticlePage }),
        React.createElement(Route, { path: 'profile(/:profileId)' })
    )
);