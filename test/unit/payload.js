import test from 'ava'
import Biglet from '../../src/Biglet'

test('biglet custom payload', t => {
  const p1 = new Biglet()
  p1.owner = {
    res: {
      render: function (tpl, data) {
        console.log(tpl)
        console.log(data)
      }
    }
  }
  p1.payload = {
    a: 1,
    b: 2
  }

  p1.compile = (tpl, data) => {
    return Promise.resolve()
  }

  p1.render = function () {
    return Promise.resolve()
  }

  p1.end = function () {
    t.regex(p1.view, /bigview.view\({\"a\":1,\"b\":2,/)
  }

  return p1._exec()
})
