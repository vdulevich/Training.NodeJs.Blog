"use strict";

var React = require("react");

var ProfilePage = React.createClass({
    displayName: "ProfilePage",

    childContextTypes: {
        location: React.PropTypes.object
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        return React.createElement(
            "h1",
            null,
            "Profile"
        );
    }
});
module.exports = ProfilePage;