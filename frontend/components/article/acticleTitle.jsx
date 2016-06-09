'use strict';
var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesTitleComponent = React.createClass({
    editorId: 'articleTitleEditorId',
    editor: null,
    getInitialState: function(){
        return {
            mode: this.props.mode,
            bgMode : this.props.mode,
            bgStyle: this.props.article.backgroundStyle
        };
    },
    componentDidMount: function(){
        this.updateArticleEditMode();
        this.refs._bg.setAttribute('style', this.state.bgStyle);
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({ bgStyle: nextProps.article.backgroundStyle });
    },
    componentDidUpdate: function(){
        this.updateArticleEditMode();
        this.refs._bg.setAttribute('style', this.state.bgStyle);
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
                    autoParagraph: false,
                    extraPlugins: 'savecancel,sourcedialog',
                    removePlugins: 'sourcearea',
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
        this.refs._bg.setAttribute('style', '');
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState)
    },
    rawMarkup: function(content) {
        return {
            __html: content//marked(content != null ? content : '')
        };
    },
    handleModeChange: function(){
        if(this.state.mode == 'read') {
            this.setState({mode: 'edit'});
        } else {
            this.setState({mode: 'read'});
        }
    },
    handleBgChange: function(event){
      this.setState({bgStyle: event.target.value});
    },
    handleBgModeChange: function(){
        if(this.state.bgMode == 'read') {
            this.setState({bgMode: 'edit'});
        } else {
            this.setState({bgMode: 'read'});
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
    handleBgSave: function(){
        if(this.props.handleSave){
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.backgroundStyle = this.refs._bgStyle.value;
            this.props.handleSave(article);
            this.forceUpdate();
        }
        this.handleBgModeChange();
    },
    render: function() {
        return (
            <div ref="_bg" className="ch-article-title">
                <div class="container title-wrap">
                    <a onClick={this.handleBgModeChange} className="glyphicon glyphicon-edit glyphicon-edit--bg"></a>
                    {
                        this.state.bgMode == 'edit' ?
                            (<div class="panel">
                                <div class="panel-body">
                                    <input ref="_bgStyle" class="ch-bg-edit-input" value={this.state.bgStyle} onChange={this.handleBgChange}/>
                                </div>
                                <div class="panel-footer clearfix">
                                    <div class="btn-toolbar pull-right">
                                        <button type="button" onClick={this.handleBgSave} className="btn btn-sm btn-primary">Save</button>
                                        <button type="button" onClick={this.handleBgModeChange} className="btn btn-sm btn-default">Cancel</button>
                                    </div>
                                </div>
                            </div>)
                            : null
                    }
                    <div className="title-content-wrap">
                        <div className="title-content"
                             id={this.editorId}
                             contentEditable={this.state.mode == 'edit' ? true: false}
                             dangerouslySetInnerHTML={this.rawMarkup(this.props.article.title)}></div>
                        <a onClick={this.handleModeChange} className="glyphicon glyphicon-edit glyphicon-edit--title"></a>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ArticlesTitleComponent;
