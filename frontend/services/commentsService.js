'use strict';
var errors = require('errors');
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
    },
    {
        name:'saveComment',
        create: function(req, resource, params, body, config, callback){
            if(req.user == null){
                return callback(errors.HttpError(404));
            }
            var data = {
                _user : req.user._id,
                _article : params.articleId,
                content : params.comment
            };
            (new CommentManager()).create(data, function(err, comment){
                if(err) {
                    return callback(err);
                }
                callback(null, comment);
            });
        }
    }
];