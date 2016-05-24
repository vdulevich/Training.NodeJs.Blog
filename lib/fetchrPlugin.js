'use strict';

module.exports = function(flexApp){
    var fetchrPlugin = flexApp.getPlugin('FetchrPlugin');

    var AuthServices = require('frontend/services/authService');
    var UserServices = require('frontend/services/userService');
    var ArticlesServices = require('frontend/services/articlesService');
    var ProfileServices = require('frontend/services/profileService');

    registerServices(AuthServices,fetchrPlugin);
    registerServices(UserServices,fetchrPlugin);
    registerServices(ArticlesServices,fetchrPlugin);
    registerServices(ProfileServices,fetchrPlugin);

    return fetchrPlugin;
};


function registerServices(services, fetchrPlugin){
    if(Array.isArray(services)){
        for(var i in services){
            fetchrPlugin.registerService(services[i]);
        }
    } else {
        fetchrPlugin.registerService(services);
    }
}