const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        {pattern: 'dist/**/*.js', type: 'module'},
        'test/global_variables.js',
        {
          pattern: config.grep ? config.grep : 'test/js/**/*.test.js',
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
