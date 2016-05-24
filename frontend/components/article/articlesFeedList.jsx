'use strict';
var React = require("react");
var ArticlesFeedListItemComponent = require("frontend/components/article/articlesFeedListItem");

var ArticlesFeedListComponent = React.createClass({
    componentDidUpdate : function(){
        if(this.props.loading){
            $(this.refs._loadMoreBtn).mask();
        } else {
            $(this.refs._loadMoreBtn).unmask();
        }
    },
    handleLoadMore: function(){
        if(this.props.handleLoadMore != null){
            this.props.handleLoadMore();
        }
    },
    render: function() {
        var articleNodes = this.props.articles.map(function(article) {
            return (
                <ArticlesFeedListItemComponent article={article} key={article._id}>
                    {article.content}
                </ArticlesFeedListItemComponent>
            )
        });
        return (
            <div>
                <div className="ch-feed-list">{articleNodes}</div>
                <input ref="_loadMoreBtn" onClick={this.handleLoadMore}
                       disabled={this.props.loaded}
                       type="button"
                       className="btn btn-default btn-link btn-block"
                       value="Load more"/>
            </div>
        );
    }
});

module.exports = ArticlesFeedListComponent;
