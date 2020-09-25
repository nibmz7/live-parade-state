const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        'test/global_variables.js',
        {
          pattern: config.grep ? config.grep : 'dist/test/**/*.test.js',
          type: 'module',
        },
      ],

      esm: {
        nodeResolve: true,
        coverage: true,
      },

      
    })
  );
  return config;
};
