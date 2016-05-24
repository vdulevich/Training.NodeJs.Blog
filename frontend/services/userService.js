'use strict';
var mongoose = require('lib/mongoose');
var errors = require('errors');
var User = require('models/user');

module.exports = {
    name: 'loadUser',
    create: function (req, resource, params, body, config, callback) {
        if(!req.session.user) {
            return callback(new errors.HttpError(403), null);
        }
        User.findById(req.session.user, callback);
    }
};