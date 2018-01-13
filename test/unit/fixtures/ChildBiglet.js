import Biglet from 'biglet'

class ChildBiglet extends Biglet {
  constructor (...args) {
    super(...args)
    this.domid = 'child-el'
  }

  fetch () {
    console.log('fetch')
    return Promise.resolve(true)
  }
}

module.exports = ChildBiglet
