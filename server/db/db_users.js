/**
 * Created by jax.luo on 2016/11/18.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/JacChat');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    account: String,
    nickname: String,
    password: String,
    avatarUrl: String,
    friends: Array
});

var User = mongoose.model('User', UserSchema);

function addUser(account, name, password, avatarUrl) {
    var user = new User({
        account: account,
        nickname: name,
        password: password,
        avatarUrl: avatarUrl || 'test',
        friends: []
    });

    user.save(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(user);
        }
    });
}

function findAllUsers() {
    User.find(function (err, users) {
        if (err) {
            return console.error(err);
        }
        console.log(users);
    });
}