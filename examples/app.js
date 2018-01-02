const Koa = require('koa')
const app = new Koa()
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const basic = require('./bpmodules/basic')

var ejs = require('ejs');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


app.use(async (ctx, next) => {
  const start = new Date()
  
  ctx.render = function (tpl, data, cb) {
    var fs = require('fs');
    var read = require('fs').readFileSync;
    var join = require('path').join;
    
    // /Users/youku/workspace/github/bigview-koa/examples/bpmodules/basic/p2/p2
    if (!fs.existsSync(tpl + ".html") ){
      console.log("tpl=" + tpl)
      var str = read(join(__dirname, './views/' + tpl + '.html'), 'utf8');
    }else{
      console.log("tpl2=" + tpl)
      var str = read(tpl + '.html', 'utf8');
    }
    
    html = ejs.compile(str)(data);
    cb(null, html)
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
});

module.exports = app
