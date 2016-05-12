'use strict';

var React = require("react");
var DialogComponent = require("dialog");
var SignupFormComponent = require("signupForm");

var SignupFormDialogComponent = React.createClass({
    handelSubmit: function () {

        this.refs._dialog.mask();
        $.ajax('/authentication/signup', {
            type: "POST",
            data: this.refs._form.getData(),
            success: function () {
                location.reload();
            }
        }).always(function () {
            this.refs._dialog.unmask();
        }.bind(this));
    },

    handleDialogShow: function () {
        this.refs._form.clear();
    },

    handleDialogShown: function () {
        this.refs._form.focus();
    },

    handleDialogResult: function (result) {
        if (result === 'success') {
            this.refs._form.submit();
        }
    },

    render: function () {
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