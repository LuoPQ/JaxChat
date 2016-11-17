window.onload = function () {
    var chat = new Chat();
    chat.init();
};

var Chat = function () {
    this.socket = null;
};

Chat.prototype = {
    constructor: Chat,
    init: function () {
        var self = this;

        self.socket = io.connect();

        self.socket.on('connect', function () {
            document.getElementById('info').textContent = 'get yourself a nickname :)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });

        document.getElementById('loginBtn').addEventListener('click', function () {
            var nickName = document.getElementById('nicknameInput').value;
            if (nickName.trim().length != 0) {
                self.socket.emit('login', nickName);
            } else {
                document.getElementById('nicknameInput').focus();
            }
        });

        self.socket.on('nickExisted', function () {
            document.getElementById('info').textContent = '!nickname is taken, choose another pls';
        });

        self.socket.on('loginSuccess', function () {
            document.title = 'hichat | ' + document.getElementById('nicknameInput').value;
            document.getElementById('loginWrapper').style.display = 'none';
            document.getElementById('messageInput').focus();
        });

        self.socket.on('system', function (nickName, userCount, type) {
            var msg = nickName + (type == 'login' ? ' joined' : ' left');
            var p = document.createElement('p');
            p.textContent = msg;
            document.getElementById('historyMsg').appendChild(p);
            document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
        });
    }
};