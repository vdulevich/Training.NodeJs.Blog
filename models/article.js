var mongoose = require("lib/mongoose");
var errors = require('errors');
var async = require('async');
var Rate = require('models/rate');

var schema = mongoose.Schema({
        title:{
            type: String,
            required: true,
        },
        content: {
            type: String
        },
        published:{
            type: Boolean
        },
        backgroundPath:{
            type: String
        },
        backgroundStyle: {
            type: String
        },
        backgroundFileName:{
            type: String
        },
        created: {
            type: Date,
            default: Date.now()
        },
        rates: [Rate],
        _comments: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Comment',
            required:true
        }],
        _user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required:true
        }
    },
    {
        toJSON: {
        virtuals: true
    }
});

schema.methods.addOrUpdateUserRate = function(userId, rating){
    var rate = this.rates.find(function(rate){ return userId.equals(rate._user) });
    if(!rate){
        rate = {_user: userId, rate: rating };
        this.rates.push(rate);
    }
    rate.rate = rating;
}

schema.virtual('rating')
    .get(function(){
        console.log(this.rates);
        return this.rates
                .map(function(item){ return item.rate; })
                .reduce(function(a, b) { return a + b;}, 0)
            / (this.rates.length == 0 ? 1 : this.rates.length);
    });

if(mongoose.models.Article){
    module.exports = mongoose.models.Article;
} else {
    module.exports = mongoose.model('Article', schema);
}