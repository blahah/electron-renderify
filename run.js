var through = require('through2')
var browserify = require('browserify')
var path = require('path')

browserify()
  .transform(require('./index'))
  .add(path.join(__dirname, 'example.js'))
  .bundle()
  .pipe(through(ondata))

function ondata (d) { noop(d) }

function noop () {}
