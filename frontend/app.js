'use strict';
var fetchrPlugin  = require('fluxible-plugin-fetchr');
var Fluxible = require('fluxible');
var LoginStore = require('frontend/stores/loginStore');
var ArticlesStore = require('frontend/stores/articlesStore');
var Routes = require('frontend/routes');

var app = new Fluxible({
    component: Routes,
    stores:[
        LoginStore,
        ArticlesStore
    ]
});
app.plug(fetchrPlugin({ xhrPath: '/_api' }));
module.exports = app;