'use strict';
var CommentManager = require('managers/commentManager');

module.exports = [
    {
        name: 'loadCommentsByArticleId',
        create: function (req, resource, params, body, config, callback) {
            (new CommentManager()).findByArticleId(params.id, function(err, comments) {
                if(err) {
                    return callback(err);
                }
                callback(null, comments);
            });
        }
    }
];