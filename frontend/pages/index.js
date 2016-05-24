"use strict";

var React = require("react");
var ArticlesFeedList = require("frontend/components/article/articlesFeedList");
var ArticlesFeedStore = require("frontend/stores/articlesFeedStore");
var articlesFeedActions = require("frontend/actions/articlesFeedActions");

var IndexComponent = React.createClass({
    displayName: "IndexComponent",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(ArticlesFeedStore).addChangeListener(this.handleStoreChange);
        this.context.executeAction(articlesFeedActions.init);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(ArticlesFeedStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState: function getStoreState() {
        return {
            articles: this.context.getStore(ArticlesFeedStore).getAll(),
            loaded: this.context.getStore(ArticlesFeedStore).getIsLoaded(),
            loading: this.context.getStore(ArticlesFeedStore).getIsLoading()
        };
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },
    handleLoadMore: function handleLoadMore() {
        this.context.executeAction(articlesFeedActions.load);
    },

    render: function render() {
        return React.createElement(ArticlesFeedList, {
            loading: this.state.loading,
            loaded: this.state.loaded,
            articles: this.state.articles,
            handleLoadMore: this.handleLoadMore });
    }
});
module.exports = IndexComponent;