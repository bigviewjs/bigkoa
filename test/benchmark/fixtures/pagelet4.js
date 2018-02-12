const Biglet = require('biglet')
const path = require('path')
const data = require('./data')

module.exports = class PageletExample4 extends Biglet {
  constructor () {
    super()
    this.domid = 'cache1'
    this.name = 'cache1'
    this.data = data
    this.tpl = path.join(__dirname, './tpl4.nj')
  }
}
