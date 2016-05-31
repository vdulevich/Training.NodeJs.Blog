'use strict';
var fetchrPlugin  = require('fluxible-plugin-fetchr');
var Fluxible = require('fluxible');
var LoginDialogStore = require('frontend/stores/loginDialogStore');
var ArticlesFeedStore = require('frontend/stores/articlesFeedStore');
var ApplicationStore = require('frontend/stores/applicationStore');
var ProfileInfoStore = require('frontend/stores/profileInfoStore');
var ArticleViewStore = require('frontend/stores/articleViewStore');
var Routes = require('frontend/routes');

var app = new Fluxible({
    component: Routes,
    stores:[
        ApplicationStore,
        LoginDialogStore,
        ArticlesFeedStore,
        ProfileInfoStore,
        ArticleViewStore
    ]
});
app.plug(fetchrPlugin({ xhrPath: '/_api' }));
module.exports = app;