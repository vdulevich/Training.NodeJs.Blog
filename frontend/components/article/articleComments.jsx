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
    render: function() {
        var dateformat = require("dateformat");
        var comments = this.props.comments.map(function(comment) {
            return (
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
            )
        });
        return (<div ref="_panel" className="list-group ch-comments-list ">
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
        </div>)
    }
});

module.exports = ArticlesCommentsComponent;