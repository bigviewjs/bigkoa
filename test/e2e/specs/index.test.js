module.exports = {
  'start': function (client) {
    client.url('http://localhost:8080/')
      // .verify.visible('#main')
      .verify.containsText('h1', 'BigKoa')
  },

  'test css': function (client) {
    client
      .verify.cssClassPresent('#pagelet1', 'box')
      .verify.cssClassPresent('#pagelet2', 'box')
  },

  'test pagelets': function (client) {
    client
      .verify.visible('#pagelet1')
      .verify.containsText('#pagelet1', 'Green City')
      .verify.elementPresent('#pagelet2')
  }
}
