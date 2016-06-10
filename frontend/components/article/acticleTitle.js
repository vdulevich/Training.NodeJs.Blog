'use strict';

var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesTitleComponent = React.createClass({
    displayName: 'ArticlesTitleComponent',

    ckEditor: null,
    getInitialState: function getInitialState() {
        return {
            mode: {
                title: 'read',
                background: 'read'
            },
            backgroundStyle: this.props.article.backgroundStyle
        };
    },
    componentDidMount: function componentDidMount() {
        this.updateTitleEditMode();
        this.refs._background.setAttribute('style', this.state.backgroundStyle);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ backgroundStyle: nextProps.article.backgroundStyle });
    },
    componentDidUpdate: function componentDidUpdate() {
        this.updateTitleEditMode();
        this.refs._background.setAttribute('style', this.state.backgroundStyle);
    },
    updateTitleEditMode: function updateTitleEditMode() {
        switch (this.state.mode.title) {
            case 'read':
                if (this.ckEditor != null) {
                    this.ckEditor.destroy();
                }
                break;
            case 'edit':
                this.ckEditor = CKEDITOR.inline(this.refs._title, {
                    startupFocus: true,
                    autoParagraph: false,
                    extraPlugins: 'savecancel,sourcedialog',
                    removePlugins: 'sourcearea',
                    on: {
                        save: function () {
                            this.handleTitleSave();
                        }.bind(this),
                        cancel: function () {
                            this.handleTitleCancel();
                        }.bind(this),
                        blur: function blur(e) {
                            return false;
                        }
                    }
                });
                break;
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        if (this.ckEditor != null) {
            this.ckEditor.destroy();
        }
        this.refs._background.setAttribute('style', '');
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState);
    },
    toggleModeChange: function toggleModeChange(name) {
        var mode = JSON.parse(JSON.stringify(this.state.mode));
        mode[name] = mode[name] == 'read' ? 'edit' : 'read';
        this.setState({ mode: mode });
    },
    handleBackgroundChange: function handleBackgroundChange(event) {
        this.setState({ backgroundStyle: event.target.value });
    },
    handleTitleCancel: function handleTitleCancel() {
        this.refs._title.innerHTML = this.props.article.title;
        this.toggleModeChange('title');
    },
    handleTitleSave: function handleTitleSave() {
        if (this.props.handleSave) {
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.title = this.ckEditor.getData();
            this.props.handleSave(article);
        }
        this.toggleModeChange('title');
    },
    handleBackgroungSave: function handleBackgroungSave() {
        if (this.props.handleSave) {
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.backgroundStyle = this.refs._backgroundStyle.value;
            this.props.handleSave(article);
        }
        this.toggleModeChange('background');
    },
    render: function render() {
        return React.createElement(
            'div',
            { ref: '_background', className: 'ch-article-title' },
            React.createElement(
                'div',
                { className: 'container title-wrap' },
                React.createElement('a', { onClick: function () {
                        this.toggleModeChange('background');
                    }.bind(this), className: 'glyphicon glyphicon-edit glyphicon-edit--bg' }),
                this.state.mode.background == 'edit' ? React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement('input', { ref: '_backgroundStyle', className: 'ch-bg-edit-input', value: this.state.backgroundStyle, onChange: this.handleBackgroundChange })
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel-footer clearfix' },
                        React.createElement(
                            'div',
                            { className: 'btn-toolbar pull-right' },
                            React.createElement(
                                'button',
                                { type: 'button', onClick: this.handleBackgroungSave, className: 'btn btn-sm btn-primary' },
                                'Save'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', onClick: function () {
                                        this.toggleModeChange('background');
                                    }.bind(this), className: 'btn btn-sm btn-default' },
                                'Cancel'
                            )
                        )
                    )
                ) : null,
                React.createElement(
                    'div',
                    { className: 'title-content-wrap' },
                    React.createElement('a', { onClick: function () {
                            this.toggleModeChange('title');
                        }.bind(this), className: 'glyphicon glyphicon-edit glyphicon-edit--title' }),
                    React.createElement('div', { className: 'title-content',
                        ref: '_title',
                        contentEditable: this.state.mode.title == 'edit',
                        dangerouslySetInnerHTML: { __html: this.props.article.title } })
                )
            )
        );
    }
});

module.exports = ArticlesTitleComponent;