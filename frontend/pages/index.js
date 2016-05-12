"use strict";

var React = require("react");
var ArticlesFeedList = require("frontend/components/article/articlesFeedList");

var IndexComponent = React.createClass({
    displayName: "IndexComponent",

    childContextTypes: {
        location: React.PropTypes.object
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        return React.createElement(ArticlesFeedList, { params: this.props.params, location: this.props.location });
    }
});
module.exports = IndexComponent;