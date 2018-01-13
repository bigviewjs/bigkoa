import test from 'ava'
import Biglet from '../../src/Biglet'
import ctx from './fixtures/context'

test('test Biglet', async t => {
  const biglet = new Biglet(ctx)
  biglet.css = './a.css'
  biglet.js = './a.js'
  biglet.domid = 'a'

  t.plan(3)

  t.is(biglet.timeout, 10000)

  await biglet._exec()
  biglet.write('<div></div')

  t.is(biglet.view, '<script type=\"text/javascript\" charset=\"utf-8\">bigview.view({\"domid\":\"a\",\"js\":\"./a.js\",\"css\":\"./a.css\",\"html\":\"tpl/index\"})</script>')

  biglet.addChild(Biglet, ctx)
  t.is(biglet.children.length, 1)

})
