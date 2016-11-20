var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    account: String,
    nickname: String,
    password: String,
    avatarUrl: String,
    friends: Array
});

module.exports = mongoose.model('User', UserSchema);