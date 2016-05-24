'use strict';
var React = require("react");
var DialogComponent = require("frontend/components/controls/dialog");
var LoginFormComponent = require("frontend/components/controls/authentication/loginForm");
var authActions = require("frontend/actions/authActions");
var loginDialogStore = require("frontend/stores/loginDialogStore");
var PureRenderMixin = require('react-addons-pure-render-mixin');

var LoginFormDialogComponent = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func
    },
    getInitialState: function(){
        return this.getStoreState();
    },
    componentDidMount:function(){
        this.context.getStore(loginDialogStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount:function() {
        this.context.getStore(loginDialogStore).removeChangeListener(this.handleStoreChange);
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState)
    },
    componentDidUpdate : function(){
        switch (this.state.loginState) {
            case 'pending':
                this.refs._dialog.mask();
                break;
            case 'failed':
                this.refs._dialog.unmask();
                this.refs._form.setValid({"email": "", "password": "Invalid user or password"});
                break;
            case 'success':
                this.refs._dialog.unmask();
                break;
        }
        switch(this.state.loginOpen){
            case true:
                this.refs._dialog.modal();
                break;
            case false:
                this.refs._dialog.hide();
                break;
        }
    },
    getStoreState () {
        return {
            loginState: this.context.getStore(loginDialogStore).getLoginState(),
            loginOpen: this.context.getStore(loginDialogStore).getLoginOpen()
        }
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },
    handelSubmit: function(){
        this.context.executeAction(authActions.login, this.refs._form.getData());
    },
    handleDialogShown:function(){
        this.refs._form.clear();
        this.refs._form.focus();
    },
    handleDialogHidden: function(e){
        this.context.executeAction(authActions.loginHide);
    },
    handleDialogResult: function(result){
        if(result === 'success'){
            this.refs._form.submit();
        }
    },
    render: function () {
        return (
            <DialogComponent onDialogResult={this.handleDialogResult}
                             onDialogShown={this.handleDialogShown}
                             onDialogHidden={this.handleDialogHidden}
                             ref="_dialog">
                <LoginFormComponent onSubmit={this.handelSubmit} ref="_form"/>
            </DialogComponent>
        )
    }
});
module.exports = LoginFormDialogComponent;
