var React = require("react");
var ApplicationStore = require('frontend/stores/applicationStore');
var ArticleViewStore = require("frontend/stores/articleViewStore");
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
    getStoreState: function(){
        return this.context.getStore(ArticleViewStore).getState();
    },
    render: function(){
        return (<div>
            <ArticleViewComponent
                ref="_article"
                article={this.state.article}
                mode={'write'} />
            <ArticleCommentsComponent
                article={this.state.article}
                comments={this.state.comments}
                mode={'write'}
                handleSave={this.handleCommentSave}/>
        </div>);
    }
});
module.exports = ArticlePage;