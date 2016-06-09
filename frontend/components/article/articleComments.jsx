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
    handleSave: function(e){
        if(this.props.handleSave != null){
            this.props.handleSave({
                articleId : this.props.article._id,
                comment: this.refs._form.value
            });
        }
    },
    timeSince: function(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    },
    render: function() {
        var dateformat = require("dateformat");
        var comments = this.props.comments.map(function(comment) {
            return (
                <div key={comment._id} className="ch-comments-list-item">
                    <div className="photo-col">
                        <img src="/images/no-photo.png"/>
                    </div>
                    <div class="content-col">
                        <div className="content-col-header">
                            <Link className="user" to={"/profile/" + comment._user._id}>
                                <strong>&nbsp;{comment._user._profile.fullName}&nbsp;</strong>
                            </Link>
                            <span className="time">
                                <span className="time-ago">{this.timeSince(new Date(comment.created))} ago</span>&nbsp;
                                <span>({dateformat(comment.created, "dd mmmm yyyy")})</span>
                            </span>
                        </div>
                        <p class="list-group-item-text">{comment.content}</p>
                    </div>
                </div>
            )
        }.bind(this));
        return (<div className={this.props.className}>
            <div ref="_panel" className="list-group ch-comments-list">
                {comments}
                {
                    this.props.mode == 'read' ? null :
                    (
                        <div>
                            <form accept-charset="UTF-8" role="form">
                                <div class="form-group">
                                    <input type="hidden" name="articleId" value="<%=article._id%>"/>
                                    <textarea ref="_form" name="comment" class="form-control" style={{height: '100px'}}></textarea>
                                </div>
                            </form>
                            <input class="btn btn-success" value="Leave comment" type="button" onClick={this.handleSave}/>
                        </div>
                    )
                }
            </div>
        </div>)
    }
});

module.exports = ArticlesCommentsComponent;