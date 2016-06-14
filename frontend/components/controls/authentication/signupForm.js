'use strict';

var React = require("react");

var SignupFormComponent = React.createClass({
    displayName: "SignupFormComponent",

    componentDidMount: function componentDidMount() {
        var form = $(this.refs._form),
            self = this;
        this.refs._validator = form.validate({
            rules: {
                /* email: {
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
                 },*/
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
            highlight: function highlight(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function unhighlight(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            submitHandler: this.props.onSubmit
        });
    },
    handelKeyDown: function handelKeyDown(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.submit();
        }
    },
    getData: function getData() {
        return $(this.refs._form).serializeObject();
    },
    focus: function focus() {
        this.refs._firstName.focus();
    },
    clear: function clear() {
        var form = $(this.refs._form);
        form.find(".form-group input").val("");
        form.find('.has-error').removeClass('has-error');
        this.refs._validator.resetForm();
    },
    submit: function submit() {
        $(this.refs._form).submit();
    },
    render: function render() {
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