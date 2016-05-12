'use strict';
var Promise = require("promise");

module.exports = {
    login: function(data){
        /*api.login(payload)
         .then(function(response){context.dispatch(actionsNames.AUTH_LOGIN_SUCCESS, response);})
         .catch(function(){context.dispatch(actionsNames.AUTH_LOGIN_FAILED);})
         .then(done);*/
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/api/authentication/login',
                type: "POST",
                data: data,
                success: function (response) {
                    resolve(response);
                },
                error: function (response) {
                    reject(response);
                }
            });
        });
    }
};