var React = require("react");
var ArticlesFeedList = require("frontend/components/article/articlesFeedList");


var IndexComponent = React.createClass({
    childContextTypes: {
        location: React.PropTypes.object
    },
    componentDidMount:function() {

    },
    render: function(){
        return (<ArticlesFeedList params={this.props.params} location={this.props.location}></ArticlesFeedList>);
    }
});
module.exports = IndexComponent;