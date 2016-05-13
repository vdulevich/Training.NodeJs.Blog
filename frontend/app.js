'use strict';
var fetchrPlugin  = require('fluxible-plugin-fetchr');
var Fluxible = require('fluxible');
var LoginStore = require('frontend/stores/loginStore');
var ArticlesStore = require('frontend/stores/articlesStore');
var ApplicationStore = require('frontend/stores/applicationStore');
var Routes = require('frontend/routes');

var app = new Fluxible({
    component: Routes,
    stores:[
        LoginStore,
        ArticlesStore,
        ApplicationStore
    ]
});
app.plug(fetchrPlugin({ xhrPath: '/_api' }));
module.exports = app;