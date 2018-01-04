'use strict'

const Pagelet = require('biglet')
const path = require('path')

module.exports = class MyPagelet extends Pagelet {
  constructor () {
      super()
      this.root = __dirname
      this.name = 'pagelet1'
      this.data = {
          title: 'layout',
          is: "pagelet1测试",
          po: {
              name: this.name
          }
      }
      this.domid = 'pagelet1'
      this.location = 'pagelet1'
      this.tpl = path.join(__dirname, 'tpl/index')
      this.delay = 4000
  }

  fetch() {
    return this.sleep(this.delay)
  }

  sleep(time) {
    return new Promise((resolve)=> setTimeout(resolve, time))
  }

}
