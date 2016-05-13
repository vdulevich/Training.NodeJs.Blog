'use strict';

module.exports = function(flexApp){
    var fetchrPlugin = flexApp.getPlugin('FetchrPlugin');

    var LoginService = require('frontend/services/login');
    var LoadUserService = require('frontend/services/loadUser');
    var LoadFeedListArticlesService = require('frontend/services/articles/loadFeedListArticles');

    fetchrPlugin.registerService(LoginService);
    fetchrPlugin.registerService(LoadUserService);
    fetchrPlugin.registerService(LoadFeedListArticlesService);

    return fetchrPlugin;
};