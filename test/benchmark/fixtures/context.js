const nunjucks = require('nunjucks')

const _map = {}

module.exports = {
  req: {
    query: {
      search: 'hello'
    },
    body: '',
    params: {
      q: 1
    },
    cookies: 'vid=101010100xml=='
  },
  res: {
    write () {
    },
    end () {

    }
  },
  render: function (tpl, data, fn) {
    if (/\.nj$/.test(tpl)) {
      return nunjucks.render(tpl, data, (err, html) => {
        fn(err, html)
      })
    } else {
      return nunjucks.renderString(tpl, data, (err, html) => {
        fn(err, html)
      })
    }
  },
  on (event, fn) {
    if (!_map[event]) {
      _map[event] = fn
    }
  },
  emit (event, res) {
    _map[event] && _map[event]()
  }

}
