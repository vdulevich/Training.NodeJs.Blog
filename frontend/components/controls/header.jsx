var React = require("react");
var Link = require("react-router").Link;
var articlesFeedListActions = require("frontend/actions/articlesFeedListActions");
var loginActions = require("frontend/actions/loginActions");
var LoginStore = require("frontend/stores/loginStore");

var HeaderComponent = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    menuTree : [
        { title: 'Home', to: { pathname: '/' } },
        { title: 'Profile', to: { pathname: '/profile' } },
        { title: 'Article', to: { pathname: '/article/id' } }
    ],
    getInitialState: function(){
        return this.getStoreState();
    },
    componentDidMount:function() {
        this.context.getStore(LoginStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount:function(){
        this.context.getStore(LoginStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState () {
        return {
            loggedUser: this.context.getStore(LoginStore).getLoggedUser()
        }
    },
    handleStoreChange () {
        this.setState(this.getStoreState());
    },
    handleLoginBtn: function(){
        this.context.executeAction(loginActions.loginOpen);
    },
    menuTreeMapFn: function(menuTree){
        return menuTree.map(function(menuLeaf) {
            return (<li key={menuLeaf.title}><Link className="nav-link" activeClassName="nav-selected" to={menuLeaf.to}>{menuLeaf.title}</Link></li>)
        });
    },
    handelSearch: function (e) {
        e.preventDefault();
        this.context.executeAction(articlesFeedListActions.search, this.refs._searchText.value);
    },
    render: function(){
        var currentMenuItems = this.menuTreeMapFn(this.menuTree);
        return (
            <div class="ch-header">
                <div class="container">
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
                                            <Link to={{pathname: '/profile'}} className="navbar-link">Welcome&nbsp;<strong>{this.state.loggedUser.email}</strong></Link>
                                            <span className="nav-divider" />
                                            <a className="navbar-link"
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
                                            <a class="navbar-link" type="button">Sign up</a>
                                        </span>
                                    )
                                }
                            </div>
                            <div class="navbar-form navbar-right" role="search">
                                <form onSubmit={this.handelSearch} class="form-group input-group">
                                    <input ref="_searchText" defaultValue={this.state.searchText} class="form-control" placeholder="search text..."/>
                                    <span class="input-group-btn">
                                        <button type="submit" class="btn btn-default">Search</button>
                                    </span>
                                </form>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = HeaderComponent;




