'use strict';
var React = require("react");
var HeaderComponent = require('frontend/components/controls/header');
var FooterComponent = require('frontend/components/controls/footer');
var LoginFormDialogComponent = require('frontend/components/authentication/loginFormDialog');
var LoginStore = require("frontend/stores/loginStore");


var Layout = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    /*getInitialState:function(){
        return this.getStoreState();
    },
    componentDidMount:function() {
        this.context.getStore(LoginStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount:function(){
        this.context.getStore(LoginStore).removeChangeListener(this.handleStoreChange);
    },
    componentDidUpdate : function(){
        if(this.state.loginOpen){
            this.refs._loginDlg.refs._dialog.modal();
        } else {
            this.refs._loginDlg.refs._dialog.hide();
        }
    },
    getStoreState () {
        return {
            loginOpen: this.context.getStore(LoginStore).getLoginOpen()
        }
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },*/
    render: function(){
        return (
            <div style={{height: '100%'}}>
                <div>
                    <LoginFormDialogComponent ref="_loginDlg" style={{display: 'none'}}/>
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

module.exports = Layout;