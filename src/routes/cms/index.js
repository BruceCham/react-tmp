if (process.env.BUILD_GC === 'cms' || process.env.BUILD_GC === 'all') {
  module.exports = require('./cms')
} else {
  module.exports = null
}
