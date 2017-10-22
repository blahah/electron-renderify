var test = require('tape')
var through = require('through2')
var browserify = require('browserify')
var path = require('path')
var fs = require('fs')
var exec = require('child_process').exec

var opts = {
  timeout: 5000
}

var bundlePath = path.join(__dirname, 'app', 'bundle.js')
var outputPath = path.join(__dirname, 'app', 'test_output.txt')

cleanup(go)

function go () {
  test('allows fs to be used in bundle in electron renderer', function (t) {
    var write = fs.createWriteStream(bundlePath)

    write.once('close', runElectron)
    write.on('err', handleErr)

    var browserifyOpts = {
      builtins: [],
      commonDir: false,
      detectGlobals: false,
      ignoreMissing: true,
      insertGlobalVars: 'global',
      browserField: false,
      standalone: 'renderer'
    }

    browserify(browserifyOpts)
      .transform(require('../index'))
      .add(path.join(__dirname, 'app', 'renderer'))
      .bundle()
      .pipe(write)

    function runElectron () {
      var electron = path.join(__dirname, '../node_modules/.bin/electron')
      var app = path.join(__dirname, 'app', 'main.js')
      var child = exec(electron + ' ' + app)

      child.once('close', runTest)
      child.on('error', handleErr)
    }

    function runTest () {
      var result = fs.readFileSync(outputPath, 'utf8')
      t.equal(result.trim(), 'text loaded')
      cleanup(function () {
        t.end()
      })
    }

    function handleErr (err) {
      cleanup(function () {
        throw err
      })
    }
  })
}

function cleanup (cb) {
  fs.unlink(bundlePath, function () {
    fs.unlink(outputPath, cb)
  })
}
