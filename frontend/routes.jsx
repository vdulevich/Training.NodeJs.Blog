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


module.exports =
    (
        <Router history={browserHistory}>
            <Route path="/" component={blogApp}>
                <IndexRoute component={IndexPage}></IndexRoute>
                <Route path="article/:articleId" component={ArticlePage}></Route>
                <Route path="profile(/:profileId)"></Route>
            </Route>
        </Router>
    );