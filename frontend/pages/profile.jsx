var React = require("react");

var ProfilePage = React.createClass({
    childContextTypes: {
        location: React.PropTypes.object
    },
    componentDidMount:function() {

    },
    render: function(){
        return (<h1>Profile</h1>);
    }
});
module.exports = ProfilePage;