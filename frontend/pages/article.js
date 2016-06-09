"use strict";

var React = require("react");
var ArticleViewStore = require("frontend/stores/articleViewStore");
var ArticleTitle = require('frontend/components/article/acticleTitle');
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
    handleArticleSave: function handleArticleSave(e) {
        this.context.executeAction(articleViewActions.saveArticle, e);
    },
    getStoreState: function getStoreState() {
        return this.context.getStore(ArticleViewStore).getState();
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(ArticleTitle, {
                article: this.state.article,
                handleSave: this.handleArticleSave,
                mode: 'read' }),
            React.createElement(ArticleViewComponent, {
                className: "ch-bg-f9 ch-article container",
                article: this.state.article,
                handleSave: this.handleArticleSave,
                mode: 'read' }),
            React.createElement(ArticleCommentsComponent, { className: "ch-bg-f9 container",
                article: this.state.article,
                comments: this.state.comments,
                handleSave: this.handleCommentSave })
        );
    }
});
module.exports = ArticlePage;