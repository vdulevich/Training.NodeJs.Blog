var mongoose = require("lib/mongoose");
var crypto = require("crypto");


var schema = mongoose.Schema({
    email:{
       type: String,
       required: true,
       unique: true
    },
    hashedPassword:{
        type: String,
        required:true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    _profile: {
        type: mongoose.Schema.ObjectId,
        ref: 'Profile'
    }
});

schema.methods.encryptPassword = function(password){
    if(password) {
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
}

schema.virtual('password')
    .set(function(password){
        this._plainPassword = password;
        this.salt = Math.random().toString();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){
        return this._plainPassword;
    });

schema.methods.checkPassword = function(password){
    return this.hashedPassword === this.encryptPassword(password);
};

schema.static('save', function(userData, callback) {
    var User = mongoose.models.User;
    (new User(userData)).save(callback);
});


if(mongoose.models.User){
    module.exports = mongoose.models.User;
} else {
    module.exports = mongoose.model('User', schema);
}

