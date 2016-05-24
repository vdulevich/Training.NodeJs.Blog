'use strict';

var React = require("react");

var SignupFormComponent = React.createClass({
    componentDidMount: function () {
        var form = $(this.refs._form),
            self = this;

        this.refs._validator = form.validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                    remote: {
                        url: "/authentication/signup/validate",
                        type: "post",
                        data: {
                            email: function () {
                                return form.find('[name=email]').val();
                            }
                        }
                    }
                },
                password: {
                    minlength: 3,
                    maxlength: 15,
                    required: true
                },
                confirmpassword: {
                    equalTo: $(this.refs._password)
                },
                firstName: {
                    minlength: 3,
                    maxlength: 15,
                    required: true
                },
                lastName: {
                    minlength: 3,
                    maxlength: 15,
                    required: true
                },
                birthday: {
                    required: true
                }
            },
            messages: {
                email: {
                    remote: "Email address already in use. Please use other email."
                }
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            submitHandler: this.props.onSubmit
        });
    },
    handelKeyDown: function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.submit();
        }
    },
    getData: function () {
        return $(this.refs._form).serialize();
    },
    focus: function () {
        this.refs._firstName.focus();
    },
    clear: function () {
        var form = $(this.refs._form);
        form.find(".form-group input").val("");
        form.find('.has-error').removeClass('has-error');
        this.refs._validator.resetForm();
    },
    submit: function () {
        $(this.refs._form).submit();
    },
    render: function () {
        return React.createElement(
            "form",
            { ref: "_form", onKeyDown: this.handelKeyDown, acceptCharset: "UTF-8", role: "form" },
            React.createElement(
                "fieldset",
                null,
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { ref: "_firstName", className: "form-control", placeholder: "First Name", name: "firstName", type: "text" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { className: "form-control", placeholder: "Last Name", name: "lastName", type: "text" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { className: "form-control", placeholder: "E-mail", name: "email", type: "text" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { ref: "_password", className: "form-control", placeholder: "Password", name: "password", type: "password" })
                ),
                React.createElement(
                    "div",
                    { className: "form-group" },
                    React.createElement("input", { className: "form-control", placeholder: "Confirm Password", name: "confirmpassword", type: "password" })
                )
            )
        );
    }
});

module.exports = SignupFormComponent;