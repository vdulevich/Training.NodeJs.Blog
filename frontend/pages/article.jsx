var React = require("react");
var ArticleViewStore = require("frontend/stores/articleViewStore");
var ArticleViewComponent = require("frontend/components/article/articleView");
var ArticleCommentsComponent = require("frontend/components/article/articleComments");

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
    getStoreState: function(){
        return this.context.getStore(ArticleViewStore).getState();
    },
    render: function(){
        return (<div>
            <ArticleViewComponent ref="_article" article={this.state.article} />
            <ArticleCommentsComponent comments={this.state.comments}/>
        </div>);
    }
});
module.exports = ArticlePage;