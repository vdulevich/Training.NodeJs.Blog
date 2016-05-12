"use strict";

var React = require("react");
var Link = require("react-router").Link;
var browserHistory = require('react-router').browserHistory;
var loginActions = require("frontend/actions/loginActions");
var LoginStore = require("frontend/stores/loginStore");

var HeaderComponent = React.createClass({
    displayName: "HeaderComponent",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    menuTree: [{ title: 'Home', to: { pathname: '/', query: { search: undefined } } }, { title: 'Profile', to: { pathname: '/profile' } }, { title: 'Article', to: { pathname: '/article/id' } }],
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(LoginStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(LoginStore).removeChangeListener(this.handleStoreChange);
    },
    getStoreState: function getStoreState() {
        return {
            loggedUser: this.context.getStore(LoginStore).getLoggedUser()
        };
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },

    handleLoginBtn: function handleLoginBtn() {
        this.context.executeAction(loginActions.loginOpen);
    },
    menuTreeMapFn: function menuTreeMapFn(menuTree) {
        return menuTree.map(function (menuLeaf) {
            return React.createElement(
                "li",
                { key: menuLeaf.title },
                React.createElement(
                    Link,
                    { className: "nav-link", activeClassName: "nav-selected", to: menuLeaf.to },
                    menuLeaf.title
                )
            );
        });
    },
    handelSearch: function handelSearch(e) {
        e.preventDefault();
        browserHistory.push('/?search=' + this.refs._searchText.value);
    },
    render: function render() {
        var currentMenuItems = this.menuTreeMapFn(this.menuTree);
        return React.createElement(
            "div",
            { className: "ch-header" },
            React.createElement(
                "div",
                { className: "container" },
                React.createElement(
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
                                    { to: { pathname: '/profile' }, className: "navbar-link" },
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
                                    { className: "navbar-link",
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
                                    { className: "navbar-link", type: "button" },
                                    "Sign up"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "navbar-form navbar-right", role: "search" },
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
                )
            )
        );
    }
});
module.exports = HeaderComponent;