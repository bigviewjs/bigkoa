const path = require('path')
const Biglet  = require('biglet')

module.exports = class P1Pagelet extends Biglet {
  constructor (args) {
    super(args)
    this.root = __dirname
    this.name = 'biglet1'
    this.data = {
      is: 'pagelet1测试',
      po: {
        title: 'Green City',
        src: 'https://mir-s3-cdn-cf.behance.net/projects/404/ce919652243157.Y3JvcCw3MjQsNTY3LDQwOCwxMzc.png'
      }
    }
    this.domid = 'pagelet1'
    this.tpl = './tpl/index'
    this.location = 'pagelet1'
    this.delay = 4000
  }

  fetch () {
    return this.sleep(this.delay)
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
