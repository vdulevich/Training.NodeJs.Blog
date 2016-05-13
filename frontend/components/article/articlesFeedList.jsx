'use strict';
var React = require("react");
var ArticlesFeedListItemComponent = require("frontend/components/article/articlesFeedListItem");
var ArticlesFeedListStore = require("frontend/stores/articlesStore");
var ArticlesFeedListActions = require("frontend/actions/articlesFeedListActions");

var ArticlesFeedListComponent = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    getInitialState: function() {
        return this.getStoreState();
    },
    componentDidMount:function() {
        this.context.getStore(ArticlesFeedListStore).addChangeListener(this.handleStoreChange);
    },
    componentDidUpdate : function(){
        if(this.state.loading){
            $(this.refs._loadMoreBtn).mask();
        } else {
            $(this.refs._loadMoreBtn).unmask();
        }}
    ,
    componentWillUnmount:function(){
        this.context.getStore(ArticlesFeedListStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState () {
        return {
            data: this.context.getStore(ArticlesFeedListStore).getAll(),
            full: this.context.getStore(ArticlesFeedListStore).getIsFull(),
            loading: this.context.getStore(ArticlesFeedListStore).getIsLoading()
        }
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },
    handelOnLoading: function(){
        $(this.refs._loadMoreBtn).mask();
    },
    handleLoadMore: function(){
        this.context.executeAction(ArticlesFeedListActions.fetchArticles);
    },
    render: function() {
        var articleNodes = this.state.data.map(function(article) {
            return (
                <ArticlesFeedListItemComponent article={article} key={article.id}>
                    {article.content}
                </ArticlesFeedListItemComponent>
            )
        });
        return (
            <div>
                <div className="ch-feed-list">{articleNodes}</div>
                <input ref="_loadMoreBtn" onClick={this.handleLoadMore} disabled={this.state.full} type="button" className="btn btn-default btn-link btn-block" value="Load more"/>
            </div>
        );
    }
});

module.exports = ArticlesFeedListComponent;
