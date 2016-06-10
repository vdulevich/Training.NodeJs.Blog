'use strict';

var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesViewComponent = React.createClass({
    displayName: 'ArticlesViewComponent',

    ckEditor: null,
    getInitialState: function getInitialState() {
        return { mode: this.props.mode };
    },
    componentDidMount: function componentDidMount() {
        this.updateArticleEditMode();
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
        this.updateArticleEditMode();
    },
    updateArticleEditMode: function updateArticleEditMode() {
        switch (this.state.mode) {
            case 'read':
                if (this.ckEditor != null) {
                    this.ckEditor.destroy();
                }
                break;
            case 'edit':
                this.ckEditor = CKEDITOR.inline(this.refs._article, {
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
        this.refs._article.innerHTML = this.rawMarkup(this.props.article.content).__html;
        this.handleModeChange();
    },
    handleSave: function handleSave() {
        if (this.props.handleSave) {
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.content = this.ckEditor.getData();
            this.props.handleSave(article);
        }
        this.handleModeChange();
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: this.props.className },
            React.createElement(
                'div',
                { ref: '_panel', className: 'panel panel-default ch-article-panel' },
                React.createElement('a', { onClick: this.handleModeChange, className: 'glyphicon glyphicon-edit pull-right' }),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement('div', { ref: '_article',
                        className: 'ch-article-panel__content',
                        contentEditable: this.state.mode == 'edit' ? true : false,
                        dangerouslySetInnerHTML: this.rawMarkup(this.props.article.content) })
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
                            { type: 'button', onClick: this.handleCancel, className: 'btn btn-sm btn-default' },
                            'Cancel'
                        )
                    )
                ) : null
            )
        );
    }
});

module.exports = ArticlesViewComponent;