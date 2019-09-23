module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 0.5%', 'ie >= 9', 'chrome >= 49', 'iOS >= 7', 'firefox >= 3.5', 'Android >= 4.3'],
    }),
  ],
}
