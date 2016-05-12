var React = require("react");

var ArticlePage = React.createClass({
    childContextTypes: {
        location: React.PropTypes.object
    },
    componentDidMount:function() {

    },
    render: function(){
        return (<h1>Article</h1>);
    }
});
module.exports = ArticlePage;