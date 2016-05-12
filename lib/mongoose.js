var mongoose = require('mongoose');
var config = require('config');

var mongoReconnect = function() {
    'use strict';
    mongoose.connect(config.get('mongoose').uri, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        }
    });
}();
module.exports = mongoose;