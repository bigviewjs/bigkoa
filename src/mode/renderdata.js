// render all pagelets as json
'use strict'

// const debug = require('debug')('bigview');
const Promise = require('bluebird')

module.exports = class RenderMode {
  constructor () {
    this.mode = 'renderdata'
    this.isLayoutWriteImmediately = true
    this.isPageletWriteImmediately = true
  }

  /**
   * execute pagelets'action
   *
   * @param {any} bigview
   * @returns
   */
  execute (pagelets) {
    let q = []
    for (var i in pagelets) {
      let _pagelet = pagelets[i]
      _pagelet.isPageletWriteImmediately = this.isPageletWriteImmediately
      q.push(_pagelet._exec(true, 'json'))
    }
    return Promise.all(q)
  }
}
