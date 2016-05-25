"use strict";

var React = require("react");
var ProfileInfo = require("frontend/components/profile/profileInfo");
var ArticlesFeedList = require("frontend/components/article/articlesFeedList");
var ProfileInfoStore = require("frontend/stores/profileInfoStore.js");
var actions = require('frontend/actions/profileInfoActions');

var ProfilePage = React.createClass({
    displayName: "ProfilePage",

    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func,
        router: React.PropTypes.object
    },
    getInitialState: function getInitialState() {
        return this.getStoreState();
    },
    componentDidMount: function componentDidMount() {
        this.context.getStore(ProfileInfoStore).addChangeListener(this.handleStoreChange);
    },
    componentWillUnmount: function componentWillUnmount() {
        this.context.getStore(ProfileInfoStore).removeChangeListener(this.handleStoreChange);
    },
    handleStoreChange: function handleStoreChange() {
        this.setState(this.getStoreState());
    },
    handleSave: function handleSave(profile) {
        this.context.executeAction(actions.save, profile);
        this.handleModeChange();
    },
    getStoreState: function getStoreState() {
        return {
            loading: this.context.getStore(ProfileInfoStore).getIsLoading(),
            profile: this.context.getStore(ProfileInfoStore).getProfile(),
            user: this.context.getStore(ProfileInfoStore).getUser(),
            articles: this.context.getStore(ProfileInfoStore).getArticles()
        };
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(ProfileInfo, {
                profile: this.state.profile,
                user: this.state.user,
                loading: this.state.loading.profile }),
            React.createElement(ArticlesFeedList, {
                articles: this.state.articles,
                loaded: true,
                loading: this.state.loading.articles })
        );
    }
});
module.exports = ProfilePage;