'use strict';

var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesTitleComponent = React.createClass({
    displayName: 'ArticlesTitleComponent',

    editorId: 'articleTitleEditorId',
    editor: null,
    getInitialState: function getInitialState() {
        return {
            mode: this.props.mode,
            bgMode: this.props.mode,
            bgStyle: this.props.article.backgroundStyle
        };
    },
    componentDidMount: function componentDidMount() {
        this.updateArticleEditMode();
        this.refs._bg.setAttribute('style', this.state.bgStyle);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({ bgStyle: nextProps.article.backgroundStyle });
    },
    componentDidUpdate: function componentDidUpdate() {
        this.updateArticleEditMode();
        this.refs._bg.setAttribute('style', this.state.bgStyle);
    },
    updateArticleEditMode: function updateArticleEditMode() {
        switch (this.state.mode) {
            case 'read':
                if (this.editor != null) {
                    this.editor.destroy();
                }
                break;
            case 'edit':
                this.editor = CKEDITOR.inline(this.editorId, {
                    startupFocus: true,
                    autoParagraph: false,
                    extraPlugins: 'savecancel,sourcedialog',
                    removePlugins: 'sourcearea',
                    on: {
                        save: function () {
                            this.handleSave();
                        }.bind(this),
                        cancel: function () {
                            this.handleCancel();
                        }.bind(this)
                    }
                });
                break;
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        if (this.editor != null) {
            this.editor.destroy();
        }
        this.refs._bg.setAttribute('style', '');
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState);
    },
    rawMarkup: function rawMarkup(content) {
        return {
            __html: content //marked(content != null ? content : '')
        };
    },
    handleModeChange: function handleModeChange() {
        if (this.state.mode == 'read') {
            this.setState({ mode: 'edit' });
        } else {
            this.setState({ mode: 'read' });
        }
    },
    handleBgChange: function handleBgChange(event) {
        this.setState({ bgStyle: event.target.value });
    },
    handleBgModeChange: function handleBgModeChange() {
        if (this.state.bgMode == 'read') {
            this.setState({ bgMode: 'edit' });
        } else {
            this.setState({ bgMode: 'read' });
        }
    },
    handleCancel: function handleCancel() {
        $('#' + this.editorId).innerHTML = this.rawMarkup(this.props.article.title).__html;
        this.handleModeChange();
    },
    handleSave: function handleSave() {
        if (this.props.handleSave) {
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.title = this.editor.getData();
            this.props.handleSave(article);
        }
        this.handleModeChange();
    },
    handleBgSave: function handleBgSave() {
        if (this.props.handleSave) {
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.backgroundStyle = this.refs._bgStyle.value;
            this.props.handleSave(article);
            this.forceUpdate();
        }
        this.handleBgModeChange();
    },
    render: function render() {
        return React.createElement(
            'div',
            { ref: '_bg', className: 'ch-article-title' },
            React.createElement(
                'div',
                { className: 'container title-wrap' },
                React.createElement('a', { onClick: this.handleBgModeChange, className: 'glyphicon glyphicon-edit glyphicon-edit--bg' }),
                this.state.bgMode == 'edit' ? React.createElement(
                    'div',
                    { className: 'panel' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement('input', { ref: '_bgStyle', className: 'ch-bg-edit-input', value: this.state.bgStyle, onChange: this.handleBgChange })
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel-footer clearfix' },
                        React.createElement(
                            'div',
                            { className: 'btn-toolbar pull-right' },
                            React.createElement(
                                'button',
                                { type: 'button', onClick: this.handleBgSave, className: 'btn btn-sm btn-primary' },
                                'Save'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', onClick: this.handleBgModeChange, className: 'btn btn-sm btn-default' },
                                'Cancel'
                            )
                        )
                    )
                ) : null,
                React.createElement(
                    'div',
                    { className: 'title-content-wrap' },
                    React.createElement('div', { className: 'title-content',
                        id: this.editorId,
                        contentEditable: this.state.mode == 'edit' ? true : false,
                        dangerouslySetInnerHTML: this.rawMarkup(this.props.article.title) }),
                    React.createElement('a', { onClick: this.handleModeChange, className: 'glyphicon glyphicon-edit glyphicon-edit--title' })
                )
            )
        );
    }
});

module.exports = ArticlesTitleComponent;