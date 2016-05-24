'use strict';

var React = require("react");
var ArticlesFeedListItemComponent = require("frontend/components/article/articlesFeedListItem");

var ArticlesFeedListComponent = React.createClass({
    displayName: "ArticlesFeedListComponent",

    componentDidUpdate: function componentDidUpdate() {
        if (this.props.loading) {
            $(this.refs._loadMoreBtn).mask();
        } else {
            $(this.refs._loadMoreBtn).unmask();
        }
    },
    handleLoadMore: function handleLoadMore() {
        if (this.props.handleLoadMore != null) {
            this.props.handleLoadMore();
        }
    },
    render: function render() {
        var articleNodes = this.props.articles.map(function (article) {
            return React.createElement(
                ArticlesFeedListItemComponent,
                { article: article, key: article._id },
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
            React.createElement("input", { ref: "_loadMoreBtn", onClick: this.handleLoadMore,
                disabled: this.props.loaded,
                type: "button",
                className: "btn btn-default btn-link btn-block",
                value: "Load more" })
        );
    }
});

module.exports = ArticlesFeedListComponent;