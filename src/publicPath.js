let publicPath = '/'
const { hostname } = window.location
if (hostname.indexOf('dev') === 0 || hostname === 'localhost') {
  // publicPath = 'dev' + publicPath;
  publicPath = '';
} else if (hostname.indexOf('qa') === 0) {
  publicPath = '//qa.cdn.com/lib'
} else if (hostname.indexOf('yz') === 0) {
  publicPath = '//yz.cdn.com/lib'
} 

window.__webpack_public_path__ = publicPath
