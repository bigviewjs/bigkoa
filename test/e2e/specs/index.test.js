module.exports = {
    'start': function(client) {
        client.url('http://localhost:8080/')
            .assert.containsText('li', 'pagelet1');
    }
};
