var mongoose = require("lib/mongoose");


var schema = mongoose.Schema({
    rate: {
        required: true,
        type: Number
    },
    created: {
        type: Date,
        default: Date.now()
    },
    _user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
});

/*
if(mongoose.models.Rate){
    module.exports = mongoose.models.Rate;
} else {
    module.exports = mongoose.model('Rate', schema);
}*/

module.exports = schema;
