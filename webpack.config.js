/**
 * module dependencies for webpack production configuration
 */
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')

const env = process.env.TARGET_ENVIRONMENT || 'dev'
const isProduction = env === 'prod'

const UrlFile = isProduction ? 'prodURL.js' : 'URL.js'

// define paths
const nodeModulesPath = path.resolve(__dirname, './node_modules')
const frontendPath = path.resolve(__dirname, "./frontend", 'src')
const publicPath = path.resolve(__dirname, "./frontend", 'public')
const localePath = path.resolve(__dirname, "./frontend", 'locale')
const buildPath = path.resolve(__dirname, "./frontend", 'public', 'build')
const mainAppPath = path.resolve(__dirname, "./frontend", 'src', 'App', 'index.js')
const historyPath = path.resolve(__dirname, "./frontend", 'src', 'history', 'history.js')
const configPath = path.resolve(__dirname, "./frontend", 'config', "credentials.js")
const URLPath = path.resolve(__dirname, "./frontend", 'config', UrlFile)
const sharedStylesPath = path.resolve(__dirname, "./frontend", 'src', 'SharedStyles')
const componentsPath = path.resolve(__dirname, "./frontend", 'src', 'Components')
const containersPath = path.resolve(__dirname, "./frontend", 'src', 'Containers')
const viewsPath = path.resolve(__dirname, "./frontend", 'src', 'Views')

/**
 * webpack production configuration
 */
module.exports = {
  target  : 'web',

  entry: [
    mainAppPath
  ],

  output: {
    filename: 'bundle.js',
    path: buildPath,
    publicPath: '/'
  },

  devServer: {
    contentBase: publicPath,
    historyApiFallback: true
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebPackPlugin({
      template: "./frontend/public/index.html",
      filename: "./index.html",
      inject: 'body'
    }),
    new CopyPlugin({
      patterns: [
        { from: localePath, to: path.resolve(buildPath, 'locale') }
      ]
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use:
        {
          loader: 'babel-loader'
        },
        exclude: [nodeModulesPath],
        include: [configPath, frontendPath]
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: {
                      localIdentName: "[name]__[local]___[hash:base64:5]"
                    }
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    sourceMap: "inline",
                    plugins: () => [
                      require('autoprefixer'), require('postcss-nesting')
                    ]
                }
            }
        ]
    },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  },

  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      SharedStyles: sharedStylesPath,
      Components: componentsPath,
      Containers: containersPath,
      MyHistory: historyPath,
      Views: viewsPath,
      URLConfig: URLPath,
      locale: localePath
    }
  },

  externals: {
    'moment': 'moment'
  }
}
