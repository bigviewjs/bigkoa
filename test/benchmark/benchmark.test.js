const Benchmark = require('benchmark')
const BigView = require('../../src')
const ctx = require('./fixtures/context')
const PageletExample = require('./fixtures/pagelet')
const PageletExample2 = require('./fixtures/pagelet2')

const suite = new Benchmark.Suite;

// add tests
suite.add('No Cache', function () {
  const bigView = new BigView(ctx, {
    layout: PageletExample
  })
  bigView.add(PageletExample2)
  bigView.start()
})
.add('Cache Level 1', function () {
  const bigView = new BigView(ctx, {
    layout: PageletExample,
    cacheLevel: 1
  })
  bigView.add(PageletExample2)
  bigView.start()
})
.add('Cache Level 2', function () {
  const bigView = new BigView(ctx, {
    layout: PageletExample,
    cacheLevel: 2
  })
  bigView.add(PageletExample2)
  bigView.start()
})

// add listeners
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
// run async
.run({ 'async': true })
