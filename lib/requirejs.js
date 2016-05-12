var requirejs = require('requirejs');

var config = {
    baseUrl:'public/js',
    paths: {
        'dialog': 'components/dialog',
        'loginForm': 'components/authentication/loginForm',
        'signupForm': 'components/authentication/signupForm',
        'loginFormDialog': 'components/authentication/loginFormDialog',
        'signupFormDialog': 'components/authentication/signupFormDialog',
        'articlesFeedList':'components/article/articlesFeedList',
        'articlesFeedListItem':'components/article/articlesFeedListItem'
    }
};
requirejs.config(config);
requirejs.onError = function (err, u, l) {
    'use strict';
    throw(err);
};

module.exports = requirejs;