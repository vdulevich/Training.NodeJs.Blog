'use strict';

var React = require("react");

var ArticlesViewComponent = React.createClass({
    displayName: "ArticlesViewComponent",

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
    render: function render() {}
});

module.exports = ArticlesViewComponent;