"use strict";

var React = require("react");

var ArticlePage = React.createClass({
    displayName: "ArticlePage",

    childContextTypes: {
        location: React.PropTypes.object
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        return React.createElement(
            "h1",
            null,
            "Article"
        );
    }
});
module.exports = ArticlePage;