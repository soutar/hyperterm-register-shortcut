const getShortcutFromConfig = require('./getShortcutFromConfig');

const config = {
  summonShortcut: 'Key Shortcut',
  summon: {
    hotkey: 'Key Config'
  },
  hotkeys: {
    summon: 'Global Hotkey'
  }
};

describe('getShortcutFromConfig', () => {
  describe('when global hotkey', () => {
    it('returns the global', () => {
      const expected = 'Global Hotkey';
      const actual = getShortcutFromConfig('summon', config);

      expect(actual).toEqual(expected);
    });
  });

  describe('when no global hotkey', () => {
    beforeAll(() => {
      delete config.hotkeys;
    });

    it('returns the config object', () => {
      const expected = 'Key Config';
      const actual = getShortcutFromConfig('summon', config);

      expect(actual).toEqual(expected);
    });
  });

  describe('when no global hotkey or key config', () => {
    beforeAll(() => {
      delete config.summon;
    });

    it('returns the shortcut', () => {
      const expected = 'Key Shortcut';
      const actual = getShortcutFromConfig('summon', config);

      expect(actual).toEqual(expected);
    });
  });

  describe('when no config', () => {
    it('returns false', () => {
      const actual = getShortcutFromConfig('summon', {});

      expect(actual).toBeUndefined()
    });
  });
});
