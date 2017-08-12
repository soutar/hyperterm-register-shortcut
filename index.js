const { dialog, globalShortcut } = require('electron');
const getShortcutFromConfig = require('./modules/getShortcutFromConfig');

function registerShortcut (configKey, action, defaultShortcut) {
  return (app, ...args) => {
    const { plugins, config } = app;
    function register (accelerator) {
      if (!accelerator) return;
      globalShortcut.unregister(accelerator);
      const registered = globalShortcut.register(
        accelerator,
        () => action(app, ...args)
      );
      if (!registered) {
        dialog.showMessageBox({
          message: `Could not register "${configKey}" shortcut (${accelerator})`,
          buttons: ['Ok']
        });
      }
    }
    function unregister (accelerator) {
      if (!accelerator) return;
      globalShortcut.unregister(accelerator);
    }

    // Setup optional default shortcut
    const defaultConfig = {}
    defaultConfig[`${configKey}Shortcut`] = defaultShortcut

    // Register the shortcut defined in ~/.hyperterm.js
    let cfg = plugins.getDecoratedConfig();

    const shortcut = getShortcutFromConfig(configKey, Object.assign(defaultConfig, cfg));
    register(shortcut);

    // Subscribe to config changes so we can register/unregister as
    // ~/.hyperterm.js is modified
    const cfgUnsubscribe = config.subscribe(() => {
      const cfg_ = plugins.getDecoratedConfig();
      const newShortcut = getShortcutFromConfig(configKey, cfg_);
      const oldShortcut = getShortcutFromConfig(configKey, cfg);
      if (newShortcut !== oldShortcut) {
        unregister(oldShortcut);
        register(newShortcut);
        cfg = cfg_;
      }
    });

    // Unsubscribe from config changes & unregister all global shortcuts on quit
    app.on('will-quit', () => {
      cfgUnsubscribe();
      globalShortcut.unregisterAll();
    });
  }
}

module.exports = registerShortcut;
