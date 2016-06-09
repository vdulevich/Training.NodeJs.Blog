'use strict';
var React = require("react");

var DialogComponent = React.createClass({
    displayName: 'DialogComponent',

    componentDidMount: function componentDidMount() {
        var dialog = $(this.refs._modal);
        dialog.on('show.bs.modal', this.handelDialogShow);
        dialog.on('shown.bs.modal', this.handelDialogShown);
        dialog.on('hidden.bs.modal', this.handelDialogHidden);
    },
    handelDialogResult: function handelDialogResult() {
        if (this.props.onDialogResult) {
            this.props.onDialogResult('success');
        }
    },
    handelDialogShow: function handelDialogShow(e) {
        if (this.props.onDialogShow) {
            this.props.onDialogShow();
        }
    },
    handelDialogShown: function handelDialogShown(e) {
        if (this.props.onDialogShown) {
            this.props.onDialogShown();
        }
    },
    handelDialogHidden: function handelDialogHidden(e) {
        if (this.props.onDialogHidden) {
            this.props.onDialogHidden(e);
        }
    },
    mask: function mask() {
        return $(this.refs._modalcontent).mask();
    },
    unmask: function unmask() {
        return $(this.refs._modalcontent).unmask();
    },
    modal: function modal() {
        $(this.refs._modal).modal();
    },
    hide: function hide() {
        $(this.refs._modal).modal('hide');
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'modal fade', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'loginLabel', ref: '_modal' },
            React.createElement(
                'div',
                { className: 'modal-dialog', role: 'document' },
                React.createElement(
                    'div',
                    { className: 'modal-content', ref: '_modalcontent' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            React.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title', id: 'loginLabel' },
                            'Login'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        this.props.children
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement('input', { onClick: this.handelDialogResult, className: 'btn btn-lg btn-success btn-block', value: 'Login', type: 'button' })
                    )
                )
            )
        );
    }
});

module.exports = DialogComponent;