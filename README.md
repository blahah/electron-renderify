---

<div align="center">
  <h1>electron-renderify</h1>
  <h2>Browserify transform to allow bundling for Electron renderer processes</h2>
  <p>
    <a href="https://npmjs.com/packages/electron-renderify" alt="npm package">
      <img src="https://img.shields.io/npm/v/electron-renderify.svg?style=flat-square">
    </a>
    <a href="https://github.com/blahah/electron-renderify/blob/master/LICENSE" alt="CC0 public domain">
      <img src="https://img.shields.io/badge/license-CC0-ff69b4.svg?style=flat-square">
    </a>
  </p>
</div>

---

## Install

```
npm install electron-renderify
```

## Usage

This module is to be used as a [browserify]() transform.

Depending on what is in your bundle, and how you are setting up Electron, you may need to apply some or all of the following browserify settings:

```js
{
  builtins: [],
  commonDir: false,
  detectGlobals: false,
  ignoreMissing: true,
  insertGlobalVars: 'global',
  browserField: false
}
```

The best place to apply the settings is in your `package.json`. That way they will take effect with either CLI or JS api use.

### CLI

```bash
browserify -t electron-renderify sample.js > bundle.js
```

### JS

```js
var browserify = require('browserify')
var renderify = require('electron-renderify')

var path = require('path')

browserify()
  .transform(renderify)
  .add(path.join(__dirname, 'sample.js'))
  .bundle()
  .pipe(process.stdout)
```

## License

To the extent possible by law, we transfer any rights we have in this code to the public domain. Specifically, we do so using the [CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).

You can do whatever you want with this code. No need to credit us, link to us, include any license, or anything else. But if you want to do those things, you're free to do that too.
