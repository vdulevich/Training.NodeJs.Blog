'use strict';

var React = require("react");
var ArticlesFeedListItemComponent = require("frontend/components/article/articlesFeedListItem");
var ArticlesFeedListStore = require("frontend/stores/articlesStore");
var ArticlesFeedListActions = require("frontend/actions/articlesFeedListActions");

var ArticlesFeedListComponent = React.createClass({
    displayName: "ArticlesFeedListComponent",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(ArticlesFeedListStore).addChangeListener(this.handleStoreChange);
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.state.loading) {
            $(this.refs._loadMoreBtn).mask();
        } else {
            $(this.refs._loadMoreBtn).unmask();
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(ArticlesFeedListStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState: function getStoreState() {
        return {
            data: this.context.getStore(ArticlesFeedListStore).getAll(),
            full: this.context.getStore(ArticlesFeedListStore).getIsFull(),
            loading: this.context.getStore(ArticlesFeedListStore).getIsLoading()
        };
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },

    handelOnLoading: function handelOnLoading() {
        $(this.refs._loadMoreBtn).mask();
    },
    handleLoadMore: function handleLoadMore() {
        this.context.executeAction(ArticlesFeedListActions.fetchArticles);
    },
    render: function render() {
        var articleNodes = this.state.data.map(function (article) {
            return React.createElement(
                ArticlesFeedListItemComponent,
                { article: article, key: article.id },
                article.content
            );
        });
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "ch-feed-list" },
                articleNodes
            ),
            React.createElement("input", { ref: "_loadMoreBtn", onClick: this.handleLoadMore, disabled: this.state.full, type: "button", className: "btn btn-default btn-link btn-block", value: "Load more" })
        );
    }
});

module.exports = ArticlesFeedListComponent;