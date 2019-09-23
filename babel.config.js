module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            '> 0.5%',
            'ie >= 9',
            'chrome >= 49',
            'iOS >= 7',
            'firefox >= 3.5',
            'Android >= 4.3',
          ],
        },
        modules: false,
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: (name) => {
          return `${name}/style/index.less`;
        },
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
  env: {
    development: {
      // presets: ['react-hmre'],
      plugins: ['react-hot-loader/babel'],
    },
  },
}
