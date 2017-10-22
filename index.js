// replace requires for electron builtin node modules with window.require

var through = require('through2')
var path = require('path')

var defaultBlacklist = [
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

module.exports = function (file, opts) {
  var data = ''

  if (!opts) opts = { windowRequire: [] }

  var blacklist = defaultBlacklist.concat(opts.windowRequire)

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

  function blacklisted (mod) {
    return blacklist.indexOf(mod.replace(/['"]+/g, '')) !== -1
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
}
