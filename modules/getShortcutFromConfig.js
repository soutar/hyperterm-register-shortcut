module.exports = function getShortcutFromConfig (key, config) {
  return (
    (config.hotkeys && config.hotkeys[key]) ||
    (config[key] && config[key]['hotkey']) ||
    config[`${key}Shortcut`]
  );
}
