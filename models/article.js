var mongoose = require("lib/mongoose");
var errors = require('errors');
var async = require('async');
var Rate = require('models/rate');

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
    rates: [Rate],
    _user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
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
        return Math.round(this.rates
                .map(function(item){ return item.rate; })
                .reduce(function(a, b) { return a + b;}, 0)
            / (this.rates.length == 0 ? 1 : this.rates.length));
    });

if(mongoose.models.Article){
    module.exports = mongoose.models.Article;
} else {
    module.exports = mongoose.model('Article', schema);
}