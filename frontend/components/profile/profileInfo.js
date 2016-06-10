'use strict';

var React = require("react");
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ProfileInfo = React.createClass({
    displayName: 'ProfileInfo',

    getInitialState: function getInitialState() {
        return {
            mode: 'read',
            firstName: this.props.profile.firstName,
            lastName: this.props.profile.lastName,
            fullName: function () {
                return [this.state.firstName, this.state.lastName].join(' ');
            }.bind(this)
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            firstName: nextProps.profile.firstName,
            lastName: nextProps.profile.lastName
        });
    },
    componentDidUpdate: function componentDidUpdate() {
        this.toggleMask();
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState);
    },
    toggleMask: function toggleMask() {
        this.props.loading ? $(this.refs._panel).mask() : $(this.refs._panel).unmask();
    },
    toggleModeChange: function toggleModeChange() {
        this.setState({ mode: this.state.mode == 'read' ? 'edit' : 'read' });
    },
    handleOnChange: function handleOnChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },
    handleSave: function handleSave() {
        if (this.props.handleSave != null) {
            var profileEdit = JSON.parse(JSON.stringify(this.props.profile));
            profileEdit.firstName = this.state.firstName;
            profileEdit.lastName = this.state.lastName;
            this.props.handleSave(profileEdit);
        }
        this.toggleModeChange();
    },
    render: function render() {
        return React.createElement(
            'div',
            { ref: '_panel', className: 'panel panel-default ch-profileinfo-panel' },
            React.createElement(
                'div',
                { className: 'panel-heading' },
                'Profile info',
                React.createElement('a', { onClick: this.toggleModeChange, className: 'glyphicon glyphicon-edit pull-right' })
            ),
            React.createElement(
                'div',
                { className: 'panel-body' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-lg-4' },
                        React.createElement(
                            'div',
                            { className: 'input-group form-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'Full Name:'
                            ),
                            React.createElement(
                                'span',
                                { className: 'form-control', disabled: 'disabled' },
                                this.state.fullName()
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-group form-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'Email:'
                            ),
                            React.createElement(
                                'span',
                                { className: 'form-control', disabled: 'disabled' },
                                this.props.user.email
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-lg-4' },
                        React.createElement(
                            'div',
                            { className: 'input-group form-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'First Name:'
                            ),
                            React.createElement('input', { className: 'form-control', disabled: this.state.mode == 'read', type: 'text', name: 'firstName', value: this.state.firstName, onChange: this.handleOnChange })
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-group form-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'Last Name:'
                            ),
                            React.createElement('input', { className: 'form-control', disabled: this.state.mode == 'read', type: 'text', name: 'lastName', value: this.state.lastName, onChange: this.handleOnChange })
                        )
                    )
                )
            ),
            this.state.mode == 'edit' ? React.createElement(
                'div',
                { className: 'panel-footer clearfix' },
                React.createElement(
                    'div',
                    { className: 'pull-right btn-toolbar' },
                    React.createElement(
                        'button',
                        { type: 'button', onClick: this.handleSave, className: 'btn btn-sm btn-primary' },
                        'Save'
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', onClick: this.toggleModeChange, className: 'btn btn-sm btn-default' },
                        'Cancel'
                    )
                )
            ) : ''
        );
    }
});

module.exports = ProfileInfo;