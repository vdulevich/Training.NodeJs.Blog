var User = require('models/user');

module.exports = function(req, res, next){
    'use strict';

    req.user = res.locals.loggedUser = null;
    if(!req.session.user) {
        return next();
    }
    User.findById(req.session.user, function(err, user){
        if(err) {
            return next(err);
        }
        req.user = res.locals.loggedUser = user;
        next();
    });
};
