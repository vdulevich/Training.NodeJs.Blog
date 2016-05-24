'use strict';

var React = require("react");
var DialogComponent = require("frontend/components/controls/dialog");
var LoginFormComponent = require("frontend/components/controls/authentication/loginForm");
var authActions = require("frontend/actions/authActions");
var loginDialogStore = require("frontend/stores/loginDialogStore");
var PureRenderMixin = require('react-addons-pure-render-mixin');

var LoginFormDialogComponent = React.createClass({
    displayName: "LoginFormDialogComponent",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(loginDialogStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(loginDialogStore).removeChangeListener(this.handleStoreChange);
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState);
    },
    componentDidUpdate: function componentDidUpdate() {
        switch (this.state.loginState) {
            case 'pending':
                this.refs._dialog.mask();
                break;
            case 'failed':
                this.refs._dialog.unmask();
                this.refs._form.setValid({ "email": "", "password": "Invalid user or password" });
                break;
            case 'success':
                this.refs._dialog.unmask();
                break;
        }
        switch (this.state.loginOpen) {
            case true:
                this.refs._dialog.modal();
                break;
            case false:
                this.refs._dialog.hide();
                break;
        }
    },
    getStoreState: function getStoreState() {
        return {
            loginState: this.context.getStore(loginDialogStore).getLoginState(),
            loginOpen: this.context.getStore(loginDialogStore).getLoginOpen()
        };
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },

    handelSubmit: function handelSubmit() {
        this.context.executeAction(authActions.login, this.refs._form.getData());
    },
    handleDialogShown: function handleDialogShown() {
        this.refs._form.clear();
        this.refs._form.focus();
    },
    handleDialogHidden: function handleDialogHidden(e) {
        this.context.executeAction(authActions.loginHide);
    },
    handleDialogResult: function handleDialogResult(result) {
        if (result === 'success') {
            this.refs._form.submit();
        }
    },
    render: function render() {
        return React.createElement(
            DialogComponent,
            { onDialogResult: this.handleDialogResult,
                onDialogShown: this.handleDialogShown,
                onDialogHidden: this.handleDialogHidden,
                ref: "_dialog" },
            React.createElement(LoginFormComponent, { onSubmit: this.handelSubmit, ref: "_form" })
        );
    }
});
module.exports = LoginFormDialogComponent;