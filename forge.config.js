const path = require('path')
const fs = require('node:fs/promises');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
  hooks: {
    // https://github.com/nodejs/node-gyp/issues/2713
    packageAfterPrune: async (_config, buildPath) => {
      const gypPath = path.join(
        buildPath,
        'node_modules',
        'cpu-features',
        'build',
        'node_gyp_bins'
      );
      await fs.rm(gypPath, {recursive: true, force: true});
   }
  }
};
