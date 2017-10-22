var fs = require('fs')
var path = require('path')

var inpath = path.join(__dirname, 'test_input.txt')
var text = fs.readFileSync(inpath)

var outpath = path.join(__dirname, 'test_output.txt')

fs.writeFileSync(outpath, text)

window.document.body.innerHTML = `<h1>SUCCESS: ${text}</h1>`

var ipc = require('electron').ipcRenderer

ipc.send('quit')
