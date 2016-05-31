'use strict';

var React = require("react");
var marked = require('marked');

var ArticlesViewComponent = React.createClass({
    displayName: 'ArticlesViewComponent',

    getBackgroundUrl: function getBackgroundUrl() {},
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
    rawMarkup: function rawMarkup(content) {
        return {
            __html: marked(content != null ? content : '')
        };
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { ref: '_panel', className: 'panel panel-default ch-article-panel' },
                React.createElement(
                    'div',
                    { className: 'panel-heading clearfix' },
                    React.createElement(
                        'strong',
                        null,
                        this.props.article.title
                    ),
                    this.props.mode == 'read' ? null : React.createElement('a', { onClick: this.handleModeChange, className: 'glyphicon glyphicon-edit pull-right' })
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement('div', { dangerouslySetInnerHTML: this.rawMarkup(this.props.article.content) })
                )
            )
        );
    }
});

module.exports = ArticlesViewComponent;