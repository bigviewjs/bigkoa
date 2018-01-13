const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const ejs = require('ejs')

// this is important
global.Promise = require('bluebird')

const basic = require('./bpmodules/basic')

const app = new Koa()
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/public')))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {

  // const start = new Date()

  ctx.render = function (tpl, data, cb) {

    const read = require('fs').readFileSync

    // /Users/youku/workspace/github/bigview-koa/examples/bpmodules/basic/p2/p2
    let str
    if (!fs.existsSync(tpl + '.html')) {
      throw new Error('cannot find file: "' + tpl + '.html"')
    } else {
      str = read(tpl + '.html', 'utf8')
    }
    let html = ''
    let errmsg = false
    try {
      html = ejs.render(str, data)
    } catch (err) {
      errmsg = err
      console.log(err)
    }
    cb(errmsg, html)
  }
  await next()
})

// ctx.render(tpl, data
// app.get('/', require('./bpmodules/basic'));

// app.get('/payload', require('./bpmodules/payload'));

// app.get('/data', require('./bpmodules/dataStore'));

// app.get('/if', require('./bpmodules/if'));

// app.get('/error', require('./bpmodules/error'));

// app.get('/nest',require('./bpmodules/nest'));

// app.get('/nest2', require('./bpmodules/nest2'));

// app.get('/default', function (req, res) {
//   var pagelets = []

//   pagelets.push(require('./bpmodules/basic/p1'))
//   pagelets.push(require('./bpmodules/basic/p2'))

//   res.render('basic/default', {
//     title: "default test",
//     pagelets: pagelets
//   })
// });

// routes
app.use(basic)

// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
