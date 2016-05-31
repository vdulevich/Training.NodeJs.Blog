var React = require("react");
var ArticlesFeedList = require("frontend/components/article/articlesFeedList");
var ArticlesFeedStore = require("frontend/stores/articlesFeedStore");
var articlesFeedActions = require("frontend/actions/articlesFeedActions");

var IndexComponent = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
    },
    getInitialState: function(){
        return this.getStoreState();
    },
    componentDidMount:function() {
        this.context.getStore(ArticlesFeedStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount:function(){
        this.context.getStore(ArticlesFeedStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState () {
        return {
            articles: this.context.getStore(ArticlesFeedStore).getAll(),
            loaded: this.context.getStore(ArticlesFeedStore).getIsFull(),
            loading: this.context.getStore(ArticlesFeedStore).getIsLoading()
        }
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },
    handleLoadMore(){
        this.context.executeAction(articlesFeedActions.loadmore);
    },
    render: function(){
        return (
            <ArticlesFeedList
                loading={this.state.loading}
                loaded={this.state.loaded}
                articles={this.state.articles}
                handleLoadMore={this.handleLoadMore}>
            </ArticlesFeedList>
        );
    }
});
module.exports = IndexComponent;