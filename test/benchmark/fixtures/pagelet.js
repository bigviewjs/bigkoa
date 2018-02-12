const Biglet = require('biglet')
const path = require('path')
const data = require('./data')

module.exports = class PageletExample extends Biglet {
  constructor () {
    super()
    this.domid = 'cache0'
    this.name = 'cache0'
    this.data = data
    this.tpl = path.join(__dirname, './tpl.nj')
  }
}
