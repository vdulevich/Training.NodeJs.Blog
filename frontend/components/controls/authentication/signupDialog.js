'use strict';

var React = require("react");
var DialogComponent = require("dialog");
var SignupFormComponent = require("signupForm");

var SignupFormDialogComponent = React.createClass({
    displayName: "SignupFormDialogComponent",

    handelSubmit: function handelSubmit() {

        this.refs._dialog.mask();
        $.ajax('/authentication/signup', {
            type: "POST",
            data: this.refs._form.getData(),
            success: function success() {
                location.reload();
            }
        }).always(function () {
            this.refs._dialog.unmask();
        }.bind(this));
    },

    handleDialogShow: function handleDialogShow() {
        this.refs._form.clear();
    },

    handleDialogShown: function handleDialogShown() {
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
                onDialogShow: this.handleDialogShow,
                onDialogShown: this.handleDialogShown,
                ref: "_dialog" },
            React.createElement(SignupFormComponent, { onSubmit: this.handelSubmit, ref: "_form" })
        );
    }
});

module.exports = SignupFormDialogComponent;