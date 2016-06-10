var React = require("react");
var Link = require("react-router").Link;
var IndexLink = require("react-router").IndexLink;
var browserHistory = require('react-router').browserHistory;
var authActions = require("frontend/actions/authActions");
var ApplicationStore = require("frontend/stores/applicationStore");

var HeaderComponent = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    getInitialState: function(){
        return this.getStoreState();
    },
    componentDidMount:function() {
        this.context.getStore(ApplicationStore).addChangeListener(this.handleStoreChange);
    },
    componentDidUpdate: function(){
        this.bindLogoutBtn();
    },
    componentWillUnmount:function(){
        this.context.getStore(ApplicationStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState () {
        return {
            loggedUser: this.context.getStore(ApplicationStore).getUser()
        }
    },
    bindLogoutBtn: function(){
        if(this.refs._logoutBtn != null) {
            $(this.refs._logoutBtn).confirm({
                confirm: function () {
                    this.context.executeAction(authActions.logout);
                }.bind(this)
            });
        }
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },
    handleLoginBtn: function(){
        this.context.executeAction(authActions.loginOpen);
    },
    handleSignUpBtn: function(){
        this.context.executeAction(authActions.signUpOpen);
    },
    menuTreeMapFn: function(){
        var links = [];
        links.push(<li key="/"><IndexLink className="nav-link" activeClassName="nav-selected" to="/">Home</IndexLink></li>);
        if(this.props.params.userId != null){
            links.push(<li key='Profile'><Link className="nav-link" activeClassName="nav-selected" to={'/profile/' + this.props.params.userId}>Profile</Link></li>)
        }
        else if(this.state.loggedUser != null){
            links.push(<li key='Profile'><Link className="nav-link" activeClassName="nav-selected" to={'/profile/' + this.state.loggedUser._id}>Profile</Link></li>)
        }
        if(this.props.params.articleId != null) {
            links.push(<li key='Article'><Link className="nav-link" activeClassName="nav-selected" to={'/article/' + this.props.params.articleId}>Article</Link></li>);
        }
        return links;
    },
    handelSearch: function (e) {
        e.preventDefault();
        browserHistory.push('/?search=' + this.refs._searchText.value);
    },
    render: function(){
        var currentMenuItems = this.menuTreeMapFn(this.menuTree);
        return (
            <div class="ch-top-navbar">
                <div class="navbar-header">
                    <span class="navbar-brand">Blog</span>
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <nav id="bs-navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-left">
                        {currentMenuItems}
                    </ul>
                    <div class="navbar-right navbar-text">
                        { this.state.loggedUser
                            ? (
                                <span>
                                    <Link to={{pathname: '/profile/'+ this.state.loggedUser._id}} className="navbar-link">Welcome&nbsp;<strong>{this.state.loggedUser.email}</strong></Link>
                                    <span className="nav-divider" />
                                    <a ref="_logoutBtn"
                                       className="navbar-link"
                                       data-text="Do you really want to logout?"
                                       data-confirm-button-class="btn-success"
                                       data-confirm-button="Yes I am"
                                       data-cancel-button="No">Logout
                                    </a>
                                </span>
                            ) : (
                                <span>
                                    <a onClick={this.handleLoginBtn} class="navbar-link" type="button">Login</a>
                                    <span className="nav-divider">or</span>
                                    <a onClick={this.handleSignUpBtn} class="navbar-link" type="button">Sign up</a>
                                </span>
                            )
                        }
                    </div>
                    <div class="ch-header-search navbar-form navbar-right" role="search">
                        <form onSubmit={this.handelSearch} class="form-group input-group">
                            <input ref="_searchText" defaultValue={this.state.searchText} className="form-control" placeholder="search text..."/>
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-default">Search</button>
                            </span>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
});
module.exports = HeaderComponent;




