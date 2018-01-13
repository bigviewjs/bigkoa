module.exports = {
    'start': function(client) {
        client.url('http://localhost:8080/')
            .assert.visible('#pagelet1');
    }
};
