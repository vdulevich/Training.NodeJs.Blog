'use strict';
var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesTitleComponent = React.createClass({
    editorId: 'articleTitleEditorId',
    editor: null,
    getInitialState: function(){
        return { mode: this.props.mode };
    },
    componentDidMount: function(){
        this.updateArticleEditMode();
    },
    componentDidUpdate: function(){
        this.updateArticleEditMode();
    },
    updateArticleEditMode: function(){
        switch(this.state.mode){
            case 'read':
                if(this.editor != null){
                    this.editor.destroy();
                }
                break;
            case 'edit':
                this.editor = CKEDITOR.inline(this.editorId, {
                    startupFocus: true,
                    extraPlugins: 'savecancel',
                    on:{
                        save:function(){
                            this.handleSave();
                        }.bind(this),
                        cancel:function(){
                            this.handleCancel();
                        }.bind(this)
                    }
                });
                break;
        }
    },
    componentWillUnmount:function(){
        if(this.editor != null){
            this.editor.destroy();
        }
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState)
    },
    rawMarkup: function(content) {
        return {
            __html: marked(content != null ? content : '')
        };
    },
    handleModeChange: function(){
        if(this.state.mode == 'read') {
            this.setState({mode: 'edit'});
        } else {
            this.setState({mode: 'read'});
        }
    },
    handleCancel:function(){
        $('#' + this.editorId).innerHTML = this.rawMarkup(this.props.article.title).__html;
        this.handleModeChange();
    },
    handleSave: function(){
        if(this.props.handleSave){
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.title = this.editor.getData();
            this.props.handleSave(article);
        }
        this.handleModeChange();
    },
    render: function() {
        return (<div className="ch-article-title">
            <div class="container title-wrap">
                <div className="title-content-wrap">
                    <div className="title-content"
                         id={this.editorId}
                         contentEditable={this.state.mode == 'edit' ? true: false}
                         dangerouslySetInnerHTML={this.rawMarkup(this.props.article.title)}>
                    </div>
                    <a onClick={this.handleModeChange} className="glyphicon glyphicon-edit pull-right"></a>
                </div>
            </div>
        </div>)
    }
});

module.exports = ArticlesTitleComponent;
