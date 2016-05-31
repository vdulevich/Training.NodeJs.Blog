"use strict";

var React = require("react");
var ApplicationStore = require('frontend/stores/applicationStore');
var ArticleViewStore = require("frontend/stores/articleViewStore");
var ArticleViewComponent = require("frontend/components/article/articleView");
var ArticleCommentsComponent = require("frontend/components/article/articleComments");
var articleViewActions = require("frontend/actions/articleViewActions");

var ArticlePage = React.createClass({
    displayName: "ArticlePage",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(ArticleViewStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(ArticleViewStore).removeChangeListener(this.handleStoreChange);
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },

    handleCommentSave: function handleCommentSave(e) {
        this.context.executeAction(articleViewActions.saveComment, e);
    },
    getStoreState: function getStoreState() {
        return this.context.getStore(ArticleViewStore).getState();
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(ArticleViewComponent, {
                ref: "_article",
                article: this.state.article,
                mode: 'write' }),
            React.createElement(ArticleCommentsComponent, {
                article: this.state.article,
                comments: this.state.comments,
                mode: 'write',
                handleSave: this.handleCommentSave })
        );
    }
});
module.exports = ArticlePage;