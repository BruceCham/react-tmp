const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('./paths')

const devMode = process.env.NODE_ENV !== 'production'
const miniCssLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../',
  },
}

const styleLoader = devMode ? 'style-loader' : miniCssLoader

module.exports = {
  entry: {
    index: path.resolve(paths.PATH_SRC, 'index'),
  },
  output: {
    path: path.resolve(paths.PATH_DIST),
    publicPath: '/',
    filename: path.join('js', '[name].js'),
    chunkFilename: path.join('js', '[name]-chunk.js'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          styleLoader,
          'css-loader?importLoaders=1',
          'postcss-loader',
        ],
        include: paths.PATH_SRC,
      },
      {
        test: /\.css$/,
        use: [
          styleLoader,
          'css-loader',
        ],
        include: paths.PATH_NODE_MODULES,
      },
      {
        test: /\.less$/,
        use: [
          styleLoader,
          'css-loader',
          'postcss-loader',
          'less-loader?{"sourceMap":true,"javascriptEnabled":true}',
        ],
        include: paths.PATH_NODE_MODULES,
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]--[local]--[hash:base64:7]&importLoaders=2',
          'postcss-loader',
          'stylus-loader',
        ],
        include: [
          path.join(paths.PATH_SRC, 'common'),
        ],
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:png|jpe?g|gif|svg|woff|eot|ttf)\??.*$/,
        use: [
          'url-loader?limit=10000&name=img/[name]-[sha512:hash:base64:7].[ext]',
        ],
        include: [
          paths.PATH_SRC,
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          'url-loader?limit=10000&name=media/[name]-[sha512:hash:base64:7].[ext]',
        ],
        include: [
          paths.PATH_SRC,
        ],
      },
    ],
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(paths.PATH_SRC),
      'node_modules',
    ],
    alias: {
      questionUI: 'components/questionUI',
      // platformUI: 'components/platformUI',
    },
  },
}
