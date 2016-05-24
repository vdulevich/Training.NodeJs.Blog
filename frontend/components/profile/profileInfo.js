'use strict';

var React = require("react");

var ProfileInfo = React.createClass({
    displayName: 'ProfileInfo',

    getInitialState: function getInitialState() {
        return { mode: 'read' };
    },
    componentDidUpdate: function componentDidUpdate() {
        switch (this.props.loading) {
            case true:
                $(this.refs._panel).mask();
                break;
            case false:
                $(this.refs._panel).unmask();
                break;
        }
    },
    handleModeChange: function handleModeChange() {
        if (this.state.mode == 'read') {
            this.setState({ profileEdit: JSON.parse(JSON.stringify(this.props.profile)) });
            this.setState({ mode: 'edit' });
        } else {
            this.setState({ mode: 'read' });
        }
    },
    handleOnChange: function handleOnChange(event) {
        this.state.profileEdit[event.target.name] = event.target.value;
        this.forceUpdate();
    },
    handleSave: function handleSave() {
        if (this.props.handleSave != null) {
            this.props.handleSave(this.state.profileEdit);
        }
    },
    render: function render() {
        return React.createElement(
            'div',
            { ref: '_panel', className: 'panel panel-default ch-profileinfo-panel' },
            React.createElement(
                'div',
                { className: 'panel-heading' },
                'Profile info',
                React.createElement('a', { onClick: this.handleModeChange, className: 'glyphicon glyphicon-edit pull-right' })
            ),
            React.createElement(
                'div',
                { className: 'panel-body' },
                this.state.mode == 'edit' ? React.createElement(
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
                                this.state.profileEdit.firstName,
                                ' ',
                                this.state.profileEdit.lastName
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
                            React.createElement('input', { type: 'text', name: 'firstName', className: 'form-control', value: this.state.profileEdit.firstName, onChange: this.handleOnChange })
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-group form-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'Last Name:'
                            ),
                            React.createElement('input', { type: 'text', name: 'lastName', className: 'form-control', value: this.state.profileEdit.lastName, onChange: this.handleOnChange })
                        )
                    )
                ) : React.createElement(
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
                                this.props.profile.fullName
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
                            React.createElement(
                                'span',
                                { className: 'form-control', disabled: 'disabled' },
                                this.props.profile.firstName
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'input-group form-group' },
                            React.createElement(
                                'span',
                                { className: 'input-group-addon' },
                                'Last Name:'
                            ),
                            React.createElement(
                                'span',
                                { className: 'form-control', disabled: 'disabled' },
                                this.props.profile.lastName
                            )
                        )
                    )
                )
            ),
            this.state.mode == 'edit' ? React.createElement(
                'div',
                { className: 'panel-footer clearfix' },
                React.createElement('input', { onClick: this.handleModeChange, className: 'btn btn-sm btn-default pull-right', value: 'Cancel', type: 'button' }),
                React.createElement('input', { onClick: this.handleSave, className: 'btn btn-sm btn-success pull-right', value: 'Save', type: 'button' })
            ) : ''
        );
    }
});

module.exports = ProfileInfo;