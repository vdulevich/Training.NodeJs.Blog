'use strict';

var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesTitleComponent = React.createClass({
    displayName: 'ArticlesTitleComponent',

    editorId: 'articleTitleEditorId',
    editor: null,
    getInitialState: function getInitialState() {
        return { mode: this.props.mode };
    },
    componentDidMount: function componentDidMount() {
        this.updateArticleEditMode();
    },
    componentDidUpdate: function componentDidUpdate() {
        this.updateArticleEditMode();
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
                    extraPlugins: 'savecancel',
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
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState);
    },
    rawMarkup: function rawMarkup(content) {
        return {
            __html: marked(content != null ? content : '')
        };
    },
    handleModeChange: function handleModeChange() {
        if (this.state.mode == 'read') {
            this.setState({ mode: 'edit' });
        } else {
            this.setState({ mode: 'read' });
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
    render: function render() {
        return React.createElement(
            'div',
            { className: 'ch-article-title' },
            React.createElement(
                'div',
                { className: 'container title-wrap' },
                React.createElement(
                    'div',
                    { className: 'title-content-wrap' },
                    React.createElement('div', { className: 'title-content',
                        id: this.editorId,
                        contentEditable: this.state.mode == 'edit' ? true : false,
                        dangerouslySetInnerHTML: this.rawMarkup(this.props.article.title) }),
                    React.createElement('a', { onClick: this.handleModeChange, className: 'glyphicon glyphicon-edit pull-right' })
                )
            )
        );
    }
});

module.exports = ArticlesTitleComponent;