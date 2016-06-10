'use strict';

var React = require("react");
var Link = require("react-router").Link;

var ArticlesFeedListItemComponent = React.createClass({
    displayName: "ArticlesFeedListItemComponent",

    getBackgroundUrl: function getBackgroundUrl() {},
    componentDidMount: function componentDidMount() {
        this.refs._bg.setAttribute('style', this.props.article.backgroundStyle);
    },
    render: function render() {
        var dateformat = require("dateformat");
        return React.createElement(
            "div",
            { className: "col-lg-6 ch-feed-list-item" },
            React.createElement(
                "div",
                { className: "panel" },
                React.createElement("div", { className: "ch-feed-itembg", ref: "_bg" }),
                React.createElement(
                    "div",
                    { className: "panel-footer" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-lg-6 ch-feed-overflow" },
                            React.createElement(
                                Link,
                                { to: "/article/" + this.props.article._id, className: "ch-feed-viewlink" },
                                React.createElement("strong", { className: "panel-title", dangerouslySetInnerHTML: { __html: this.props.article.title } })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-lg-6 ch-feed-author ch-feed-overflow" },
                            React.createElement(
                                Link,
                                { className: "ch-feed-iconlabel", to: '/profile/' + this.props.article.userId },
                                React.createElement("span", { className: "glyphicon glyphicon-user" }),
                                React.createElement(
                                    "span",
                                    null,
                                    this.props.article.author
                                )
                            )
                        )
                    ),
                    React.createElement("div", { className: "ch-feed-content", dangerouslySetInnerHTML: { __html: this.props.article.content } }),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-lg-6 ch-feed-overflow" },
                            React.createElement(
                                "span",
                                { className: "ch-feed-iconlabel" },
                                React.createElement("span", { className: "glyphicon glyphicon-time" }),
                                React.createElement(
                                    "span",
                                    null,
                                    dateformat(this.props.article.created, "mmmm dd, yyyy")
                                )
                            ),
                            React.createElement(
                                "span",
                                { className: "ch-feed-iconlabel" },
                                React.createElement("span", { className: "glyphicon glyphicon-comment" }),
                                React.createElement(
                                    Link,
                                    { to: "/article/" + this.props.article._id },
                                    "comments (",
                                    this.props.article.comments,
                                    ")"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-lg-6" },
                            React.createElement(
                                "div",
                                { className: "ch-feed-rate" },
                                React.createElement(
                                    "span",
                                    null,
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