'use strict';

var React = require("react");
var Link = require("react-router").Link;

var ArticlesCommentsComponent = React.createClass({
    displayName: "ArticlesCommentsComponent",

    getBackgroundUrl: function getBackgroundUrl() {},
    componentDidUpdate: function componentDidUpdate() {
        switch (this.props.loading) {
            case true:
                $(this.refs._panel).mask();
                break;
            case false:
                $(this.refs._panel).unmask();
                break;
        }
    },
    handleSave: function handleSave(e) {
        if (this.props.handleSave != null) {
            this.props.handleSave({
                articleId: this.props.article._id,
                comment: this.refs._form.value
            });
        }
    },
    timeSince: function timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    },
    render: function render() {
        var dateformat = require("dateformat");
        var comments = this.props.comments.map(function (comment) {
            return React.createElement(
                "div",
                { key: comment._id, className: "ch-comments-list-item" },
                React.createElement(
                    "div",
                    { className: "photo-col" },
                    React.createElement("img", { src: "/images/no-photo.png" })
                ),
                React.createElement(
                    "div",
                    { className: "content-col" },
                    React.createElement(
                        "div",
                        { className: "content-col-header" },
                        React.createElement(
                            Link,
                            { className: "user", to: "/profile/" + comment._user._id },
                            React.createElement(
                                "strong",
                                null,
                                " ",
                                comment._user._profile.fullName,
                                " "
                            )
                        ),
                        React.createElement(
                            "span",
                            { className: "time" },
                            React.createElement(
                                "span",
                                { className: "time-ago" },
                                this.timeSince(new Date(comment.created)),
                                " ago"
                            ),
                            " ",
                            React.createElement(
                                "span",
                                null,
                                "(",
                                dateformat(comment.created, "dd mmmm yyyy"),
                                ")"
                            )
                        )
                    ),
                    React.createElement(
                        "p",
                        { className: "list-group-item-text" },
                        comment.content
                    )
                )
            );
        }.bind(this));
        return React.createElement(
            "div",
            { className: this.props.className },
            React.createElement(
                "div",
                { ref: "_panel", className: "list-group ch-comments-list" },
                comments,
                this.props.mode == 'read' ? null : React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "form",
                        { "accept-charset": "UTF-8", role: "form" },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement("input", { type: "hidden", name: "articleId", value: "<%=article._id%>" }),
                            React.createElement("textarea", { ref: "_form", name: "comment", className: "form-control", style: { height: '100px' } })
                        )
                    ),
                    React.createElement("input", { className: "btn btn-success", value: "Leave comment", type: "button", onClick: this.handleSave })
                )
            )
        );
    }
});

module.exports = ArticlesCommentsComponent;