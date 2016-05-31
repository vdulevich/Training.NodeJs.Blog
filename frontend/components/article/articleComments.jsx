'use strict';
var React = require("react");
var Link = require("react-router").Link;

var ArticlesCommentsComponent = React.createClass({
    getBackgroundUrl: function () {

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
    },
    render: function() {
        var dateformat = require("dateformat");
        var comments = this.props.comments.map(function(comment)
        {
            return (
                <div className="ch-comments-list list-group">
                    <div key={comment._id} className="ch-comments-list-item">
                        <div className="photo-col">
                            <img src="/images/no-photo.png"/>
                        </div>
                        <div class="content-col">
                            <div className="content-col-header">Comment by
                                <Link to={"/profile/" + comment._user._id}>
                                    <strong>&nbsp;{comment._user._profile.fullName}&nbsp;</strong>
                                </Link>
                                at {dateformat(comment.created, "dd-mm-yyyy")}
                            </div>
                            <p class="list-group-item-text">{comment.content}</p>
                        </div>
                    </div>
                </div>
            )
        });
        return (<div ref="_panel">
            {comments}
        </div>)
    }
});

module.exports = ArticlesCommentsComponent;