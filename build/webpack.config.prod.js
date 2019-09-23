const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const pxtorem = require('postcss-pxtorem')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ChunkmapPlugin = require('./webpack-chunkmap-plugin')
// const StatsPlugin = require('stats-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../',
  },
}
const openSourceMap = process.env.BUILD_ENV === 'qa'
const baseConfig = require('./webpack.config.base.js')
const paths = require('./paths')

module.exports = merge(baseConfig, {
  mode: 'production',
  stats: 'minimal',
  devtool: 'source-map',
  // profile: true,
  output: {
    path: path.resolve(paths.PATH_DIST, 'cicp'),
    filename: 'js/[name]-[hash:7].js',
    // chunkFilename: 'js/[name]-[chunkhash:7].js',
    chunkFilename: 'js/[chunkhash:7].child.js',
    publicPath: '/webstatic/cicp/',
    crossOriginLoading: 'anonymous',
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          miniCssLoader,
          'css-loader?modules&localIdentName=[hash:base64:7]&importLoaders=2',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                pxtorem({
                  rootValue: 100,
                  unitPrecision: 5,
                  mediaQuery: false,
                  minPixelValue: 0,
                  propList: [
                    '*background*', '*padding*', '*margin*',
                    'letter-spacing', '*width', '*height',
                    'left', 'right', 'top', 'bottom', 'font*',
                    'border-radius',
                  ],
                }),
              ],
            },
          },
          'stylus-loader',
        ],
        include: paths.PATH_SRC,
        exclude: path.resolve(paths.PATH_SRC, 'common'),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist/'], {
      exclude: ['lib'],
      root: paths.PATH_ROOT,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env.BUILD_GC': JSON.stringify(process.env.BUILD_GC || 'all'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:7].css',
      chunkFilename: 'css/[contenthash:7].child.css',
    }),
    new ChunkmapPlugin({
      serverPath: '',
      prefix: '/webstatic/cicp/',
      filename: '../server/rev-manifest.json',
    }),
    // new BundleAnalyzerPlugin(),
    // new StatsPlugin('stats.json', {
    //   chunkModules: true,
    //   exclude: [/node_modules[\\\/]react/]
    // }),
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
        sourceMap: openSourceMap, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'index',
    //       test: /\.(css|styl|less)$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  },
})
