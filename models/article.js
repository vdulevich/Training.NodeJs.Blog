var mongoose = require("lib/mongoose");
var errors = require('errors');


var schema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    keywords: {
        type: Array
    },
    content: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    _user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
});

schema.static('create', function(title, content, userId, callback) {
    var Article = mongoose.models.Article;
    (new Article({ title: title, content: content, _user: userId })).save(callback);
});

if(mongoose.models.Article){
    module.exports = mongoose.models.Article;
} else {
    module.exports = mongoose.model('Article', schema);
}