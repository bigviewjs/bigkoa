const MyBigView = require('./MyBigView')
const Main = require('./main')
const Layout = require('./layout')
const P1 = require('./p1')
const P2 = require('./p2')

module.exports = function (ctx, next) {
  var bigpipe = new MyBigView(ctx)

  // main and layout setter
  bigpipe.main = Main
  bigpipe.layout = Layout

  bigpipe.mode = 'pipeline'
  bigpipe.add(P1)
  bigpipe.add(P2)

  if (ctx.query && ctx.query.bigview_mode) {
    bigpipe.mode = ctx.query.bigview_mode
  }

  if (ctx.cookies && ctx.cookies.bigview_mode) {
    bigpipe.mode = ctx.cookies.bigview_mode
  }

  return bigpipe.start()
}
