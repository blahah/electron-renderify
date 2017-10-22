// replace requires for electron builtin node modules with window.require

var through = require('through2')
var path = require('path')

module.exports = function (file) {
  var data = ''

  return (path.extname(file) === '.json')
    ? through()
    : through(ondata, onend)

  function ondata (d, enc, cb) {
    data += d
    cb()
  }

  function onend (cb) {
    var replaced = replace(data)
    this.push(replaced)
    cb()
  }
}

function replace (code) {
  return code.replace(/\srequire\(([^\)]+)\)/g, function (match, mod) {
    if (blacklisted(mod)) {
      return ' window.require(' + mod + ')'
    } else {
      return match
    }
  })
}

var blacklist = [
  'assert',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'constants',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'electron',
  'events',
  'fs',
  'http',
  'https',
  'module',
  'net',
  'os',
  'path',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  '_stream_duplex',
  '_stream_passthrough',
  '_stream_readable',
  '_stream_transform',
  '_stream_writable',
  'string_decoder',
  'sys',
  'timers',
  'tls',
  'tty',
  'url',
  'util',
  'vm',
  'zlib',
  '_process'
]

function blacklisted (mod) {
  return blacklist.indexOf(mod.replace(/['"]+/g, '')) !== -1
}
