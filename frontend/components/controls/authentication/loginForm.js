'use strict';

var React = require("react");

var LoginFormComponent = React.createClass({
    displayName: 'LoginFormComponent',

    componentDidMount: function componentDidMount() {
        var form = $(this.refs._form);
        this.refs._validator = form.validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                password: {
                    minlength: 3,
                    maxlength: 15,
                    required: true
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
        this.refs._email.focus();
    },
    clear: function clear() {
        var form = $(this.refs._form);
        form.find(".form-group input").val("");
        form.find('.has-error').removeClass('has-error');
        this.refs._validator.resetForm();
    },
    setValid: function setValid(data) {
        this.refs._validator.showErrors(data);
    },
    submit: function submit() {
        $(this.refs._form).submit();
    },
    render: function render() {
        return React.createElement(
            'form',
            { onKeyDown: this.handelKeyDown, ref: '_form', acceptCharset: 'UTF-8', role: 'form' },
            React.createElement(
                'fieldset',
                null,
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement('input', { className: 'form-control', ref: '_email', placeholder: 'E-mail', name: 'email', type: 'text', required: 'true' })
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement('input', { className: 'form-control', placeholder: 'Password', name: 'password', type: 'password', required: 'true' })
                ),
                React.createElement(
                    'div',
                    { className: 'checkbox' },
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', { name: 'remember', type: 'checkbox' }),
                        React.createElement(
                            'span',
                            null,
                            'Remember Me'
                        )
                    )
                )
            )
        );
    }
});

module.exports = LoginFormComponent;