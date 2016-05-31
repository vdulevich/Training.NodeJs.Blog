'use strict';
var React = require("react");
var marked = require('marked');

var ArticlesViewComponent = React.createClass({
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
    rawMarkup: function(content) {
        return {
            __html: marked(content)
        };
    },
    render: function() {
        return (<div>
            <div ref="_panel" className="panel panel-default ch-article-panel">
                <div class="panel-heading clearfix">
                    <strong>{this.props.article.title}</strong>
                    <a onClick={this.handleModeChange} className="glyphicon glyphicon-edit pull-right"></a>
                </div>
                <div class="panel-body">
                    <div dangerouslySetInnerHTML={this.rawMarkup(this.props.article.content)}></div>
                </div>
            </div>
        </div>)
    }
});

module.exports = ArticlesViewComponent;
