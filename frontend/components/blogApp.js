'use strict';

var React = require("react");
var HeaderComponent = require('frontend/components/controls/header');
var FooterComponent = require('frontend/components/controls/footer');
var LoginFormDialogComponent = require('frontend/components/authentication/loginFormDialog');
var LoginStore = require("frontend/stores/loginStore");

var BlogApp = React.createClass({
    displayName: 'BlogApp',

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    /*getInitialState:function(){
        return this.getStoreState();
    },
    componentDidMount:function() {
        this.context.getStore(LoginStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount:function(){
        this.context.getStore(LoginStore).removeChangeListener(this.handleStoreChange);
    },
    componentDidUpdate : function(){
        if(this.state.loginOpen){
            this.refs._loginDlg.refs._dialog.modal();
        } else {
            this.refs._loginDlg.refs._dialog.hide();
        }
    },
    getStoreState () {
        return {
            loginOpen: this.context.getStore(LoginStore).getLoginOpen()
        }
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },*/
    render: function render() {
        return React.createElement(
            'div',
            { style: { height: '100%' } },
            React.createElement(
                'div',
                null,
                React.createElement(LoginFormDialogComponent, { ref: '_loginDlg', style: { display: 'none' } })
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