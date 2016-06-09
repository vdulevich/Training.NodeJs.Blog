var React = require("react");
var ArticleViewStore = require("frontend/stores/articleViewStore");
var ArticleTitle = require('frontend/components/article/acticleTitle');
var ArticleViewComponent = require("frontend/components/article/articleView");
var ArticleCommentsComponent = require("frontend/components/article/articleComments");
var articleViewActions = require("frontend/actions/articleViewActions");

var ArticlePage = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
    },
    getInitialState: function(){
        return this.getStoreState();
    },
    componentDidMount:function() {
        this.context.getStore(ArticleViewStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount:function(){
        this.context.getStore(ArticleViewStore).removeChangeListener(this.handleStoreChange);
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },
    handleCommentSave: function(e){
        this.context.executeAction(articleViewActions.saveComment, e);
    },
    handleArticleSave:function(e){
        this.context.executeAction(articleViewActions.saveArticle, e);
    },
    getStoreState: function(){
        return this.context.getStore(ArticleViewStore).getState();
    },
    render: function(){
        return (<div>
            <ArticleTitle
                article={this.state.article}
                handleSave = {this.handleArticleSave}
                mode={'read'}/>
            <ArticleViewComponent
                className="ch-bg-f9 ch-article container"
                article={this.state.article}
                handleSave = {this.handleArticleSave}
                mode={'read'} />
            <ArticleCommentsComponent className="ch-bg-f9 container"
                article={this.state.article}
                comments={this.state.comments}
                handleSave={this.handleCommentSave}/>
        </div>);
    }
});
module.exports = ArticlePage;