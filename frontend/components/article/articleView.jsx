'use strict';
var React = require("react");

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
    render: function() {
        
    }
});

module.exports = ArticlesViewComponent;
