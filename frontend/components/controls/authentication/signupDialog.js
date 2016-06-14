'use strict';

var React = require("react");
var DialogComponent = require("frontend/components/controls/dialog");
var SignupFormComponent = require("frontend/components/controls/authentication/signupForm");
var SignupDialogStore = require('frontend/stores/signupDialogStore');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var authActions = require("frontend/actions/authActions");

var SignupFormDialogComponent = React.createClass({
    displayName: "SignupFormDialogComponent",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func
    },
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(SignupDialogStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(SignupDialogStore).removeChangeListener(this.handleStoreChange);
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState);
    },
    componentDidUpdate: function componentDidUpdate() {
        switch (this.state.state) {
            case 'pending':
                this.refs._dialog.mask();
                break;
            case 'failed':
                this.refs._dialog.unmask();
                //this.refs._form.setValid({"email": "", "password": "Invalid user or password"});
                break;
            case 'success':
                this.refs._dialog.unmask();
                break;
        }
        switch (this.state.opened) {
            case true:
                this.refs._dialog.modal();
                break;
            case false:
                this.refs._dialog.hide();
                break;
        }
    },
    getStoreState: function getStoreState() {
        return this.context.getStore(SignupDialogStore).getState();
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },

    handelSubmit: function handelSubmit() {
        this.context.executeAction(authActions.signup, this.refs._form.getData());
    },
    handleDialogHidden: function handleDialogHidden(e) {
        this.context.executeAction(authActions.signupHide);
    },
    handleDialogShown: function handleDialogShown() {
        this.refs._form.clear();
        this.refs._form.focus();
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
            React.createElement(SignupFormComponent, { onSubmit: this.handelSubmit, ref: "_form" })
        );
    }
});

module.exports = SignupFormDialogComponent;