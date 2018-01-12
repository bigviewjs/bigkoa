'use strict'

const { BigView } = require('../../../src')

module.exports = class MyBigView extends BigView {
  before () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true)
      }, 0)
    })
  }

}
