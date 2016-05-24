'use strict';

var React = require("react");
var HeaderComponent = require('frontend/components/controls/header');
var FooterComponent = require('frontend/components/controls/footer');
var LoginDialogComponent = require('frontend/components/controls/authentication/loginDialog');

var BlogApp = React.createClass({
    displayName: 'BlogApp',

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    render: function render() {
        return React.createElement(
            'div',
            { style: { height: '100%' } },
            React.createElement(
                'div',
                null,
                React.createElement(LoginDialogComponent, { ref: '_loginDlg', style: { display: 'none' } })
            ),
            React.createElement(
                'div',
                { style: { height: '100%' } },
                React.createElement(
                    'div',
                    { className: 'ch-wrapper' },
                    React.createElement(
                        'div',
                        { className: 'ch-header' },
                        React.createElement(
                            'div',
                            { className: 'container' },
                            React.createElement(HeaderComponent, { params: this.props.params, location: this.props.location })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'ch-center container' },
                        this.props.children
                    )
                ),
                React.createElement(FooterComponent, null)
            )
        );
    }
});

module.exports = BlogApp;