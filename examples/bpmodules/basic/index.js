'use strict'

const MyBigView = require('./MyBigView')

module.exports = function (ctx, next) {
    
    var bigpipe = new MyBigView(ctx, 'basic/index', { title: "测试" })
    
    // bigpipe.mode = 'render'
    bigpipe.add(require('./p1'))
    bigpipe.add(require('./p2'))
    
    if (ctx.query && ctx.query.bigview_mode) {
        bigpipe.mode = ctx.query.bigview_mode
    }
    
    // console.log(bigpipe.mode)
    
    // 从this.cookies('bigview_mode') 其次
    // debug("this.cookies = " + req.cookies)
    if (ctx.cookies && ctx.cookies.bigview_mode) {
        bigpipe.mode = ctx.cookies.bigview_mode
    }

    console.log(bigpipe.mode)

    // bigpipe.preview('aaaa.html')
    // bigpipe.isMock = true
    //  bigpipe.previewFile = 'aaaa.html'
    return bigpipe.start()
}