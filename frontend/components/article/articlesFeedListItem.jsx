'use strict';
var React = require("react");
var Link = require("react-router").Link;

var ArticlesFeedListItemComponent = React.createClass({
    getBackgroundUrl: function () {

    },
    componentDidMount: function(){
        this.refs._bg.setAttribute('style', this.props.article.backgroundStyle);
    },
    render: function() {
        var dateformat = require("dateformat");
        return (
            <div className="col-lg-6 ch-feed-list-item">
                <div className="panel" >
                    <div className="ch-feed-itembg" ref="_bg"></div>
                    <div className="panel-footer">
                        <div className="row">
                            <div className="col-lg-6 ch-feed-overflow">
                                <Link to={"/article/" + this.props.article._id} className="ch-feed-viewlink">
                                    <strong className="panel-title" dangerouslySetInnerHTML={{__html: this.props.article.title}}></strong>
                                </Link>
                            </div>
                            <div className="col-lg-6 ch-feed-author ch-feed-overflow">
                                <Link class="ch-feed-iconlabel" to={'/profile/' + this.props.article.userId}>
                                    <span class="glyphicon glyphicon-user" ></span>
                                    <span>{this.props.article.author}</span>
                                </Link>
                            </div>
                        </div>
                        <div className="ch-feed-content" dangerouslySetInnerHTML={{__html: this.props.article.content}}></div>
                        <div className="row">
                            <div className="col-lg-6 ch-feed-overflow">
                                <span class="ch-feed-iconlabel">
                                    <span class="glyphicon glyphicon-time"></span>
                                    <span>{dateformat(this.props.article.created, "mmmm dd, yyyy")}</span>
                                </span>
                                <span class="ch-feed-iconlabel">
                                    <span class="glyphicon glyphicon-comment"></span>
                                    <Link to={"/article/" + this.props.article._id}>comments ({this.props.article.comments})</Link>
                                </span>
                            </div>
                            <div className="col-lg-6">
                                <div className="ch-feed-rate">
                                    <span>
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
