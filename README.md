# hyperterm-register-shortcut

Register user-customisable global shortcuts for HyperTerm which respect config changes. This module is designed to be used by HyperTerm plugins to implement global shortcuts and can't be installed as a plugin itself.

For the configKey `foo`, `hyperterm-register-shortcut` will look for the user's preferred hotkey in `config.hotkeys.foo` and `config.fooShortcut`, prioritising the `hotkeys` object.

## Usage

First, import the helper from `hyperterm-register-shortcut`

```js
const registerShortcut = require('hyperterm-register-shortcut');
```

Then use registerShortcut to create an `onApp` method to export:

```js
const configKey = 'YOUR_SHORTCUT_NAME';

function foo (app) {
  // do something with app
  console.log('bar');
}

module.exports = {
  onApp: registerShortcut(configKey, foo)
}
```
Or, if you have other work you need to do inside `onApp`, export your own function which calls `registerShortcut` then calls the function returned from it with `app` as the parameter

```js
const configKey = 'YOUR_SHORTCUT_NAME';

function foo () {
  // do something with app
  console.log('bar');
}

module.exports = {
  onApp: (app) => {
    // do some other onApp stuff first
    registerShortcut(configKey, foo)(app)
  }
}
```
