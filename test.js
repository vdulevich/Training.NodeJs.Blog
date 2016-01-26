var mongoose = require('lib/mongoose');
var Profile = require('models/profile');
var User = require('models/user');

var Profile = mongoose.models.Profile;

Profile.create('Vladimir', 'Dulevich', 'test@test.com', 'test', function(err, profile){
    console.log(err);
    console.log(profile)
});

