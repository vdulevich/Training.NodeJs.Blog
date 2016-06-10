'use strict';
var React = require("react");
var marked = require('marked');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ArticlesTitleComponent = React.createClass({
    ckEditor: null,
    getInitialState: function(){
        return {
            mode: {
                title: 'read',
                background: 'read'
            },
            backgroundStyle: this.props.article.backgroundStyle
        };
    },
    componentDidMount: function(){
        this.updateTitleEditMode();
        this.refs._background.setAttribute('style', this.state.backgroundStyle);
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({ backgroundStyle: nextProps.article.backgroundStyle });
    },
    componentDidUpdate: function(){
        this.updateTitleEditMode();
        this.refs._background.setAttribute('style', this.state.backgroundStyle);
    },
    updateTitleEditMode: function(){
        switch(this.state.mode.title){
            case 'read':
                if(this.ckEditor != null){
                    this.ckEditor.destroy();
                }
                break;
            case 'edit':
                this.ckEditor = CKEDITOR.inline(this.refs._title, {
                    startupFocus: true,
                    autoParagraph: false,
                    extraPlugins: 'savecancel,sourcedialog',
                    removePlugins: 'sourcearea',
                    on:{
                        save:function(){ this.handleTitleSave(); }.bind(this),
                        cancel:function(){ this.handleTitleCancel(); }.bind(this),
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
        this.refs._background.setAttribute('style', '');
    },
    shouldComponentUpdate: function(nextProps, nextState){
        return PureRenderMixin.shouldComponentUpdate.bind(this)(nextProps, nextState)
    },
    toggleModeChange: function(name){
        var mode = JSON.parse(JSON.stringify(this.state.mode));
        mode[name] = (mode[name] == 'read' ? 'edit' : 'read');
        this.setState({mode: mode});
    },
    handleBackgroundChange: function(event){
      this.setState({backgroundStyle: event.target.value});
    },
    handleTitleCancel:function(){
        this.refs._title.innerHTML = this.props.article.title;
        this.toggleModeChange('title');
    },
    handleTitleSave: function(){
        if(this.props.handleSave){
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.title = this.ckEditor.getData();
            this.props.handleSave(article);
        }
        this.toggleModeChange('title');
    },
    handleBackgroungSave: function(){
        if(this.props.handleSave){
            var article = JSON.parse(JSON.stringify(this.props.article));
            article.backgroundStyle = this.refs._backgroundStyle.value;
            this.props.handleSave(article);
        }
        this.toggleModeChange('background');
    },
    render: function() {
        return (
            <div ref="_background" className="ch-article-title">
                <div class="container title-wrap">
                    <a onClick={function(){this.toggleModeChange('background')}.bind(this)} className="glyphicon glyphicon-edit glyphicon-edit--bg"/>
                    {
                        this.state.mode.background == 'edit' ?
                            (<div class="panel">
                                <div class="panel-body">
                                    <input ref="_backgroundStyle" class="ch-bg-edit-input" value={this.state.backgroundStyle} onChange={this.handleBackgroundChange}/>
                                </div>
                                <div class="panel-footer clearfix">
                                    <div class="btn-toolbar pull-right">
                                        <button type="button" onClick={this.handleBackgroungSave} className="btn btn-sm btn-primary">Save</button>
                                        <button type="button" onClick={function(){this.toggleModeChange('background')}.bind(this)} className="btn btn-sm btn-default">Cancel</button>
                                    </div>
                                </div>
                            </div>)
                            : null
                    }
                    <div className="title-content-wrap">
                        <a onClick={function(){this.toggleModeChange('title')}.bind(this)} className="glyphicon glyphicon-edit glyphicon-edit--title"/>
                        <div className="title-content"
                             ref="_title"
                             contentEditable={this.state.mode.title == 'edit'}
                             dangerouslySetInnerHTML={{__html: this.props.article.title}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ArticlesTitleComponent;
