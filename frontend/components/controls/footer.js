var React = require("react");

var FooterComponent = React.createClass({
    render: function () {
        return React.createElement(
            "div",
            { className: "ch-footer" },
            "Footer container"
        );
    }
});

module.exports = FooterComponent;