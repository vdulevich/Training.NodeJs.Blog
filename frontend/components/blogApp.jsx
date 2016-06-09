'use strict';
var React = require("react");
var HeaderComponent = require('frontend/components/controls/header');
var FooterComponent = require('frontend/components/controls/footer');
var LoginDialogComponent = require('frontend/components/controls/authentication/loginDialog');

var BlogApp = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    render: function(){
        return (
            <div style={{height: '100%'}}>
                <div class="ch-modals">
                    <LoginDialogComponent ref="_loginDlg"/>
                </div>
                <div class="ch-wrapper">
                    <div class="ch-header">
                        <div class="container container--header">
                            <HeaderComponent params={this.props.params} location={this.props.location}/>
                        </div>
                    </div>
                    {this.props.children}
                </div>
                <FooterComponent/>
            </div>
        );
    }
});

module.exports = BlogApp;