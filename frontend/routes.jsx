'use strict';
var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var BlogApp = require('frontend/components/blogApp');
var IndexPage = require('frontend/pages/index');
var ArticlePage = require('frontend/pages/article');
var ProfilePage = require('frontend/pages/profile');
var routeActions = require("frontend/actions/routeActions");

function onChange(prevState, nextState){
    context.getActionContext().executeAction(routeActions.changeRoute, nextState);
}

module.exports =
    (
        <Router>
            <Route path="/" component={BlogApp} onChange={onChange}>
                <IndexRoute name="index" component={IndexPage}></IndexRoute>
                <Route name="article" path="article/:articleId" component={ArticlePage}></Route>
                <Route name="profile" path="profile(/:userId)" component={ProfilePage}></Route>
            </Route>
        </Router>
    );