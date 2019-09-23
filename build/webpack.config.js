const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pxtorem = require('postcss-pxtorem')
const ApiMocker = require('mocker-api')
const fs = require('fs')
const paths = require('./paths')
const baseConfig = require('./webpack.config.base.js')

const mockPath = path.resolve(__dirname, '../mock/index.js')
const noProxy = process.env.NO_PROXY === 'true'

const GCID = process.env.BUILD_GC
const GCTmpExist = fs.existsSync(`./tmp/${GCID}.html`)
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]--[local]--[hash:base64:7]&importLoaders=2',
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: GCTmpExist ? `./tmp/${process.env.BUILD_GC}.html` : './tmp/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.BUILD_GC': JSON.stringify(process.env.BUILD_GC || 'all'),
    }),
    new MiniCssExtractPlugin('css/[name].css'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    runtimeChunk: true,
  },
  devServer: {
    before(app) {
      !noProxy && ApiMocker(app, mockPath)
    },
    // proxy: {
    //   '/webapi/': {
    //     target: 'https://test-picture.xueersi.com',
    //     pathRewrite: {
    //       '^/webapi/': '',
    //     },
    //     changeOrigin: true,
    //     logLevel: 'debug',
    //   },
    // },
    clientLogLevel: 'error',
    port: 3000,
    contentBase: paths.PATH_DIST,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    progress: true,
    historyApiFallback: true,
    https: true,
  },
})
