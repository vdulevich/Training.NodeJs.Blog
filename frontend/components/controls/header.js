"use strict";

var React = require("react");
var Link = require("react-router").Link;
var IndexLink = require("react-router").IndexLink;
var browserHistory = require('react-router').browserHistory;
var authActions = require("frontend/actions/authActions");
var ApplicationStore = require("frontend/stores/applicationStore");

var HeaderComponent = React.createClass({
    displayName: "HeaderComponent",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(ApplicationStore).addChangeListener(this.handleStoreChange);
    },
    componentDidUpdate: function componentDidUpdate() {
        this.bindLogoutBtn();
    },
    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(ApplicationStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState: function getStoreState() {
        return {
            loggedUser: this.context.getStore(ApplicationStore).getUser()
        };
    },

    bindLogoutBtn: function bindLogoutBtn() {
        if (this.refs._logoutBtn != null) {
            $(this.refs._logoutBtn).confirm({
                confirm: function () {
                    this.context.executeAction(authActions.logout);
                }.bind(this)
            });
        }
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },

    handleLoginBtn: function handleLoginBtn() {
        this.context.executeAction(authActions.loginOpen);
    },
    handleSignupBtn: function handleSignupBtn() {
        this.context.executeAction(authActions.signUpOpen);
    },
    menuTreeMapFn: function menuTreeMapFn() {
        var links = [];
        links.push(React.createElement(
            "li",
            { key: "/" },
            React.createElement(
                IndexLink,
                { className: "nav-link", activeClassName: "nav-selected", to: "/" },
                "Home"
            )
        ));
        if (this.props.params.userId != null) {
            links.push(React.createElement(
                "li",
                { key: "Profile" },
                React.createElement(
                    Link,
                    { className: "nav-link", activeClassName: "nav-selected", to: '/profile/' + this.props.params.userId },
                    "Profile"
                )
            ));
        } else if (this.state.loggedUser != null) {
            links.push(React.createElement(
                "li",
                { key: "Profile" },
                React.createElement(
                    Link,
                    { className: "nav-link", activeClassName: "nav-selected", to: '/profile/' + this.state.loggedUser._id },
                    "Profile"
                )
            ));
        }
        if (this.props.params.articleId != null) {
            links.push(React.createElement(
                "li",
                { key: "Article" },
                React.createElement(
                    Link,
                    { className: "nav-link", activeClassName: "nav-selected", to: '/article/' + this.props.params.articleId },
                    "Article"
                )
            ));
        }
        return links;
    },
    handelSearch: function handelSearch(e) {
        e.preventDefault();
        browserHistory.push('/?search=' + this.refs._searchText.value);
    },
    render: function render() {
        var currentMenuItems = this.menuTreeMapFn(this.menuTree);
        return React.createElement(
            "div",
            { className: "ch-top-navbar" },
            React.createElement(
                "div",
                { className: "navbar-header" },
                React.createElement(
                    "span",
                    { className: "navbar-brand" },
                    "Blog"
                ),
                React.createElement(
                    "button",
                    { className: "navbar-toggle collapsed", type: "button", "data-toggle": "collapse", "data-target": "#bs-navbar", "aria-controls": "bs-navbar", "aria-expanded": "false" },
                    React.createElement(
                        "span",
                        { className: "sr-only" },
                        "Toggle navigation"
                    ),
                    React.createElement("span", { className: "icon-bar" }),
                    React.createElement("span", { className: "icon-bar" }),
                    React.createElement("span", { className: "icon-bar" })
                )
            ),
            React.createElement(
                "nav",
                { id: "bs-navbar", className: "collapse navbar-collapse" },
                React.createElement(
                    "ul",
                    { className: "nav navbar-nav navbar-left" },
                    currentMenuItems
                ),
                React.createElement(
                    "div",
                    { className: "navbar-right navbar-text" },
                    this.state.loggedUser ? React.createElement(
                        "span",
                        null,
                        React.createElement(
                            Link,
                            { to: { pathname: '/profile/' + this.state.loggedUser._id }, className: "navbar-link" },
                            "Welcome ",
                            React.createElement(
                                "strong",
                                null,
                                this.state.loggedUser.email
                            )
                        ),
                        React.createElement("span", { className: "nav-divider" }),
                        React.createElement(
                            "a",
                            { ref: "_logoutBtn",
                                className: "navbar-link",
                                "data-text": "Do you really want to logout?",
                                "data-confirm-button-class": "btn-success",
                                "data-confirm-button": "Yes I am",
                                "data-cancel-button": "No" },
                            "Logout"
                        )
                    ) : React.createElement(
                        "span",
                        null,
                        React.createElement(
                            "a",
                            { onClick: this.handleLoginBtn, className: "navbar-link", type: "button" },
                            "Login"
                        ),
                        React.createElement(
                            "span",
                            { className: "nav-divider" },
                            "or"
                        ),
                        React.createElement(
                            "a",
                            { onClick: this.handleSignupBtn, className: "navbar-link", type: "button" },
                            "Sign up"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "ch-header-search navbar-form navbar-right", role: "search" },
                    React.createElement(
                        "form",
                        { onSubmit: this.handelSearch, className: "form-group input-group" },
                        React.createElement("input", { ref: "_searchText", defaultValue: this.state.searchText, className: "form-control", placeholder: "search text..." }),
                        React.createElement(
                            "span",
                            { className: "input-group-btn" },
                            React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-default" },
                                "Search"
                            )
                        )
                    )
                )
            )
        );
    }
});
module.exports = HeaderComponent;