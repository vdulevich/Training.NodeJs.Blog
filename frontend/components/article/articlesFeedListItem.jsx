'use strict';
var React = require("react");
var Link = require("react-router").Link;


var ArticlesFeedListItemComponent = React.createClass({
    getBackgroundUrl: function () {

    },
    render: function() {
        var dateformat = require("dateformat");
        return (
            <div className="col-lg-6 ch-feed-list-item">
                <div className="panel" >
                    <div className="panel-heading">
                        <div className="row">
                            <div className="ch-feed-title col-lg-6">
                                <a className="ch-feed-viewlink" target="_self" href="/article/{this.props.article.id}"><strong className="panel-title">{this.props.article.title}</strong></a>
                            </div>
                            <div className="ch-feed-author col-lg-6">
                                <span>Created by <Link to={'/profile/' + this.props.article.userId}><strong>{this.props.article.author}</strong></Link></span>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="ch-feed-content">{this.props.article.content}</div>
                    </div>
                    <div className="panel-footer">
                        <div className="row">
                            <div className="ch-feed-title col-lg-6">
                                {dateformat(this.props.article.created, "dd-mm-yyyy")}&nbsp;
                                <a target="_self" className="ch-feed-viewlink" href="/article/{this.props.article.id}">comments ({this.props.article.comments})</a>
                            </div>
                            <div className="ch-feed-author col-lg-6">
                                <div className="ch-feed-rate">
                                    <span>rating&nbsp;
                                        <strong>{this.props.article.rating.toFixed(1)}<span className="glyphicon glyphicon-star"></span></strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = ArticlesFeedListItemComponent;
