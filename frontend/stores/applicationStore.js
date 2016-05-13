'use strict';
var createStore = require('fluxible/addons').createStore;
var actionsNames = require('frontend/constants').actions;

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    initialize: function () {
        this.currentRoute = null;
    },
    _handleNavigate: function (route) {
  /*      if (this.currentRoute && route.path === this.currentRoute.path) {
            return;
        }*/

        this.currentRoute = route;
        this.emitChange();
    },
    getQuery: function(){
        return this.currentRoute ? this.currentRoute.location.query : {};
    },
    getState: function () {
        return {
            route: this.currentRoute
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentRoute = state.route;
    }
});

ApplicationStore.handlers = {};
ApplicationStore.handlers[actionsNames.CHANGE_ROUTE] = '_handleNavigate';

module.exports = ApplicationStore;