"use strict";

var React = require("react");
var ArticleViewStore = require("frontend/stores/articleViewStore");
var ArticleViewComponent = require("frontend/components/article/articleView");
var ArticleCommentsComponent = require("frontend/components/article/articleComments");

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

    getStoreState: function getStoreState() {
        return this.context.getStore(ArticleViewStore).getState();
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(ArticleViewComponent, { ref: "_article", article: this.state.article }),
            React.createElement(ArticleCommentsComponent, { comments: this.state.comments })
        );
    }
});
module.exports = ArticlePage;