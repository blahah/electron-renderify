var test = require('tape')
var through = require('through2')
var browserify = require('browserify')
var path = require('path')

test('replaces all blacklisted requires, leaving others intact', function (t) {
  t.plan(1)

  browserify()
    .transform(require('../index'))
    .add(path.join(__dirname, '..', 'sample.js'))
    .bundle()
    .pipe(through(ondata, onend))

  var data = ''

  function ondata (d, enc, cb) {
    data += d
    cb()
  }

  function onend (cb) {
    var lines = data.split('\n')
    console.log(lines)
    var start = lines.indexOf('// renderify sample start') + 1
    var end = lines.indexOf('// renderify sample end')

    t.deepEqual(
      lines.slice(start, end),
      [
        "var fs = window.require('fs')",
        "var renderify = require('./index')"
      ]
    )

  }
})
