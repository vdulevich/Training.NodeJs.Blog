'use strict';
var React = require("react");

var LoginFormComponent = React.createClass({
    componentDidMount:function(){
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
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            submitHandler: this.props.onSubmit
        });
    },
    handelKeyDown: function(e){
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.submit();
        }
    },
    getData: function(){
        return $(this.refs._form).serializeObject();
    },
    focus:function(){
        this.refs._email.focus();
    },
    clear: function(){
        var form = $(this.refs._form);
        form.find(".form-group input").val("");
        form.find('.has-error').removeClass('has-error');
        this.refs._validator.resetForm();
    },
    setValid: function(data){
        this.refs._validator.showErrors(data);
    },
    submit: function(){
        $(this.refs._form).submit();
    },
    render: function () {
        return (
            <form onKeyDown={this.handelKeyDown} ref="_form" acceptCharset="UTF-8" role="form">
                <fieldset>
                    <div className="form-group">
                        <input className="form-control" ref="_email" placeholder="E-mail" name="email" type="text" required="true" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Password" name="password" type="password" required="true" />
                     </div>
                    <div className="checkbox">
                        <label>
                            <input name="remember" type="checkbox"/><span>Remember Me</span>
                        </label>
                    </div>
                </fieldset>
            </form>
        )
    }
});

module.exports = LoginFormComponent;

