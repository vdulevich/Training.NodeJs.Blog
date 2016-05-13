'use strict';
var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
//var browserHistory = require('react-router').browserHistory;
var navigateActions = require("frontend/actions/navigateActions");
var BlogApp = require('frontend/components/blogApp');
var IndexPage = require('frontend/pages/index');
var ArticlePage = require('frontend/pages/article');
var ProfilePage = require('frontend/pages/profile');
var articlesFeedListActions = require("frontend/actions/articlesFeedListActions");


function onChange(prevState, nextState){
    context.getActionContext().executeAction(navigateActions.changeRoute, nextState);
}

module.exports =
    (
        <Router>
            <Route path="/" component={BlogApp} onChange={onChange}>
                <IndexRoute component={IndexPage}></IndexRoute>
                <Route path="article/:articleId" component={ArticlePage}></Route>
                <Route path="profile(/:profileId)" component={ProfilePage}></Route>
            </Route>
        </Router>
    );