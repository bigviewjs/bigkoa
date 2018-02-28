'use strict'

const debug = require('debug')('bigview')
const Promise = require('bluebird')
const EventEmitter = require('events')
const zlib = require('zlib')

const ModeInstanceMappings = require('./mode')
const Utils = require('./utils')

const PROMISE_RESOLVE = Promise.resolve(true)

module.exports = class BigViewBase extends EventEmitter {
  constructor (ctx, options) {
    super()

    this.mode = 'pipeline'

    // 缓存express的req和res
    this.ctx = ctx
    this.req = ctx.req
    this.res = ctx.res

    // 用于缓存res.write的内容
    this.cache = []

    // 设置 gzip 压缩
    this.gzip = !!options.gzip

    this.on('bigviewWrite', this.writeDataToBrowser.bind(this))
    this.on('pageletWrite', this.writeDataToBrowser.bind(this))
  }

  set gzip (gzip) {
    if (gzip) {
      // set header
      this.ctx.set('Content-Encoding', 'gzip')
      this.output = zlib.createGzip()
      this.output.pipe(this.res)
      this._gzip = gzip
    }
  }

  get gzip () {
    return this._gzip
  }

  set dataStore (obj) {
    this._dataStore = obj
  }

  get dataStore () {
    return this._dataStore
  }

  get query () {
    return this.req.query
  }

  get params () {
    return this.req.params
  }

  get body () {
    return this.req.body
  }

  get cookies () {
    return this.req.cookies
  }

  set mode (mode) {
    debug('bigview mode = ' + mode)
    if (!ModeInstanceMappings[mode]) {
      Utils.error('bigview.mode only support [ pipeline | parallel | reduce | reducerender | render ]')
      return
    }
    this._mode = mode
    this._modeInstance = this.getModeInstanceWith(mode)
  }

  get mode () {
    debug('mode = ' + this._mode)
    return this._mode
  }

  get modeInstance () {
    debug('modeInstance = ' + this._modeInstance)
    return this._modeInstance
  }
  // refact
  getModeInstanceWith (mode) {
    debug('biglet (children) mode = ' + mode)
    if (!ModeInstanceMappings[mode]) {
      Utils.log('biglet (children) .mode only support [ pipeline | parallel | reduce | reducerender | render ]')
      return
    }
    return new ModeInstanceMappings[mode]()
  }

  /**
   * render the template
   * @api public
   */
  render (...args) {
    return this.ctx.render(...args)
  }

  /**
   * Write bigview data to Browser.
   *
   * @api public;
   */
  writeDataToBrowser (text, isWriteImmediately) {
    if (!text) {
      throw new Error('Write empty data to Browser.')
    }

    // 是否立即写入，如果不立即写入，放到this.cache里
    if (!isWriteImmediately || this.modeInstance.isLayoutWriteImmediately === false) {
      return this.cache.push(text)
    }

    if (this.done) {
      throw new Error(' Write data to Browser after bigview.dong = true.')
    }

    if (text && text.length > 0) {
      // write to Browser;
      if (this.gzip) {
        this.output.write(text, () => {
          debug(`bigview gzip, text size is: ${text.length}`)
          this.output.flush()
        })
      } else {
        this.res.write(text)
      }
    }
  }

  processError (err) {
    return new Promise(function (resolve, reject) {
      debug(err)
      resolve(true)
    })
  }

  // lifecycle;
  beforeRenderPagelets () {
    return PROMISE_RESOLVE
  }

  afterRenderPagelets () {
    return PROMISE_RESOLVE
  }

  beforeRenderLayout () {
    return PROMISE_RESOLVE
  }

  afterRenderLayout () {
    return PROMISE_RESOLVE
  }

  afterRenderMain () {
    return PROMISE_RESOLVE
  }

  // event wrapper
  write (html, isWriteImmediately) {
    // 不生效，某种模式下会有问题
    this.emit('bigviewWrite', html, isWriteImmediately)
  }
}
