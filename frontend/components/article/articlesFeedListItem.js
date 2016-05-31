'use strict';

var React = require("react");
var Link = require("react-router").Link;

var ArticlesFeedListItemComponent = React.createClass({
    displayName: "ArticlesFeedListItemComponent",

    getBackgroundUrl: function getBackgroundUrl() {},
    render: function render() {
        var dateformat = require("dateformat");
        return React.createElement(
            "div",
            { className: "col-lg-6 ch-feed-list-item" },
            React.createElement(
                "div",
                { className: "panel" },
                React.createElement(
                    "div",
                    { className: "panel-heading" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "ch-feed-title col-lg-6" },
                            React.createElement(
                                Link,
                                { to: "/article/" + this.props.article._id, className: "ch-feed-viewlink" },
                                React.createElement(
                                    "strong",
                                    { className: "panel-title" },
                                    this.props.article.title
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "ch-feed-author col-lg-6" },
                            React.createElement(
                                "span",
                                null,
                                "Created by ",
                                React.createElement(
                                    Link,
                                    { to: '/profile/' + this.props.article.userId },
                                    React.createElement(
                                        "strong",
                                        null,
                                        this.props.article.author
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-body" },
                    React.createElement(
                        "div",
                        { className: "ch-feed-content" },
                        this.props.article.content
                    )
                ),
                React.createElement(
                    "div",
                    { className: "panel-footer" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "ch-feed-title col-lg-6" },
                            dateformat(this.props.article.created, "dd-mm-yyyy"),
                            " ",
                            React.createElement(
                                Link,
                                { to: "/article/" + this.props.article._id },
                                "comments (",
                                this.props.article.comments,
                                ")"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "ch-feed-author col-lg-6" },
                            React.createElement(
                                "div",
                                { className: "ch-feed-rate" },
                                React.createElement(
                                    "span",
                                    null,
                                    "rating ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        this.props.article.rating.toFixed(1),
                                        React.createElement("span", { className: "glyphicon glyphicon-star" })
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = ArticlesFeedListItemComponent;