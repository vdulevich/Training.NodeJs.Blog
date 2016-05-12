'use strict';
var mongoose = require('lib/mongoose');
var errors = require('errors');
var User = require('models/user');
var errors = require('errors');

module.exports = {
    name: 'loadUser',
    read: function (req, resource, params, config, callback) {
        if(!req.session.user) {
            return callback(new errors.HttpError(403), null);
        }
        User.findById(req.session.user, callback);
    }
};