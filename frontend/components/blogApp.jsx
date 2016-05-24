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
                <div>
                    <LoginDialogComponent ref="_loginDlg" style={{display: 'none'}}/>
                </div>
                <div style={{height: '100%'}}>
                    <div class="ch-wrapper">
                        <div class="ch-header">
                            <div class="container">
                                <HeaderComponent params={this.props.params} location={this.props.location}/>
                            </div>
                        </div>
                        <div class="ch-center container">
                            {this.props.children}
                        </div>
                    </div>
                    <FooterComponent/>
                </div>
            </div>
        );
    }
});

module.exports = BlogApp;