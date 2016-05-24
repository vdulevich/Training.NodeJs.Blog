"use strict";

var React = require("react");
var ArticlesFeedStore = require("frontend/stores/articlesFeedStore");

var ArticlePage = React.createClass({
    displayName: "ArticlePage",

    render: function render() {
        return React.createElement(
            "h1",
            null,
            "Article"
        );
    }
});
module.exports = ArticlePage;