'use strict';
var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesViewComponent = React.createClass({
    ckEditor: null,
    getInitialState: function(){
        return { mode: this.props.mode };
    },
    componentDidMount: function(){
        this.updateArticleEditMode();
    },
    componentDidUpdate: function(){
        switch(this.props.loading){
            case true:
                $(this.refs._panel).mask();
                break;
            case false:
                $(this.refs._panel).unmask();
                break;
        }
        this.updateArticleEditMode();
    },
    updateArticleEditMode: function(){
        switch(this.state.mode){
            case 'read':
                if(this.ckEditor != null){
                    this.ckEditor.destroy();
                }
                break;
            case 'edit':
                this.ckEditor = CKEDITOR.inline(this.refs._article, {
                    startupFocus: true,
                    autoParagraph: false,
                    extraPlugins: 'savecancel,sourcedialog',
                    removePlugins: 'sourcearea',
                    on:{
                        save:function(){ this.handleSave();}.bind(this),
                        cancel:function(){ this.handleCancel();}.bind(this),
                        blur: function(e){ return false; }
                    }
                });
                break;
        }
    },
    componentWillUnmount:function(){
        if(this.ckEditor != null){
            this.ckEditor.destroy();
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
        this.refs._article.innerHTML = this.rawMarkup(this.props.article.content).__html;
        this.handleModeChange();
    },
    handleSave: function(){
        if(this.props.handleSave){
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.content = this.ckEditor.getData();
            this.props.handleSave(article);
        }
        this.handleModeChange();
    },
    render: function() {
        return (<div className={this.props.className}>
            <div ref="_panel" className="panel panel-default ch-article-panel">
                <a onClick={this.handleModeChange} className="glyphicon glyphicon-edit pull-right"></a>
                <div class="panel-body">
                    <div ref="_article"
                         className="ch-article-panel__content"
                         contentEditable={this.state.mode == 'edit' ? true: false}
                         dangerouslySetInnerHTML={this.rawMarkup(this.props.article.content)}>
                    </div>
                </div>
                {
                    this.state.mode == 'edit' ?
                        (<div className="panel-footer clearfix">
                            <div class="pull-right btn-toolbar">
                                <button type="button" onClick={this.handleSave} className="btn btn-sm btn-primary">Save</button>
                                <button type="button" onClick={this.handleCancel} className="btn btn-sm btn-default">Cancel</button>
                            </div>
                        </div>)
                        : null
                }
            </div>
        </div>)
    }
});

module.exports = ArticlesViewComponent;
