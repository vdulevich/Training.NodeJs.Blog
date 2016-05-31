"use strict";

var React = require("react");

var FooterComponent = React.createClass({
    displayName: "FooterComponent",

    render: function render() {
        return React.createElement(
            "div",
            { className: "ch-footer" },
            "Footer container"
        );
    }
});

module.exports = FooterComponent;