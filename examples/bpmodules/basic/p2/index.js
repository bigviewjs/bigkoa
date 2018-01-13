const path = require('path')
const { Biglet } = require('../../../../src')

module.exports = class P2Pagelet extends Biglet {
  constructor (args) {
    super(args)
    this.root = __dirname
    this.name = 'biglet2'
    this.data = {
      t: '测试',
      po: {
        title: 'Street-light in the morning',
        src: 'https://mir-s3-cdn-cf.behance.net/projects/404/4962b752362283.Y3JvcCwyMDUwLDE2MDUsMjUzLDA.png'
      }
    }
    this.domid = 'pagelet2'
    this.tpl = path.join(__dirname, './p2')
    this.delay = 7000
  }

  fetch () {
    return this.sleep(this.delay)
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(() => resolve(this.data), time))
  }
}
