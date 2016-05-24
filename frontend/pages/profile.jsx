var React = require("react");
var ProfileInfo = require("frontend/components/profile/profileInfo")
/*var ProfileArticles = require("frontend/components/profile/profileArticles");*/
var ArticlesFeedList = require("frontend/components/article/articlesFeedList");
var ProfileInfoStore = require("frontend/stores/profileInfoStore.js");
var actions = require('frontend/actions/profileInfoActions');

var ProfilePage = React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func,
        getStore: React.PropTypes.func
    },
    getInitialState: function(){
        return this.getStoreState();
    },
    componentDidMount: function(){
        this.context.getStore(ProfileInfoStore).addChangeListener(this.handleStoreChange);
        this.context.executeAction(actions.loadArticles);
        this.context.executeAction(actions.loadProfile);
    },
    componentWillUnmount:function(){
        this.context.getStore(ProfileInfoStore).removeChangeListener(this.handleStoreChange);
    },
    handleStoreChange : function() {
        this.setState(this.getStoreState());
    },
    handleSave:function(profile){
        this.context.executeAction(actions.save, profile);
        this.handleModeChange();
    },
    getStoreState: function(){
        return {
            loading: this.context.getStore(ProfileInfoStore).getIsLoading(),
            profile: this.context.getStore(ProfileInfoStore).getProfile(),
            user: this.context.getStore(ProfileInfoStore).getUser(),
            articles: this.context.getStore(ProfileInfoStore).getArticles(),
        };
    },
    render: function(){
        return (
            <div>
                <ProfileInfo
                    profile={this.state.profile}
                    user={this.state.user}
                    loading={this.state.loading.profile}>
                </ProfileInfo>
                <ArticlesFeedList
                    articles={this.state.articles}
                    loaded={true}
                    loading={this.state.loading.articles}>
                </ArticlesFeedList>
            </div>
        );
    }
});
module.exports = ProfilePage;