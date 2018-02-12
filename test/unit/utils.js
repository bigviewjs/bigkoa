import test from 'ava'
import * as utils from '../../src/utils'

test('test utils.ready()', t => {
  const str = utils.ready()
  t.is(str, '<script charset="utf-8">bigview.ready();</script>')

  const str2 = utils.ready(true)
  t.is(str2, '<script charset="utf-8">bigview.debug=true;bigview.ready();</script>')
})

test('test utils.end()', t => {
  const str = utils.end()
  t.is(str, '<script charset="utf-8">bigview.end()</script>')

  const str2 = utils.end({a: 1})
  t.is(str2, '<script charset="utf-8">bigview.end({"a":1})</script>')
})

test('test utils.lurMapCache', t => {
  const lurMapCache = utils.lurMapCache
  lurMapCache.init(10)
  lurMapCache.set('a', 1)
  t.is(lurMapCache.get('a'), 1)
  lurMapCache.delete('a')
})

test('test utils.log()', t => {
  utils.log()
  utils.log()
  t.pass()
})
