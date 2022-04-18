const env = require('./env.js');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (webpackEnv) => {
  const production = webpackEnv['production'] || env['NODE_ENV'] === 'production';
  return {
    target: ['browserslist'],
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    mode: (production) ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(eot|ttf|woff|woff2)$/i,
          type: 'asset',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: 'asset',
          generator: {
            filename: 'images/[name][ext]'
          }
        },
        {
          test: /\.(css)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(js)$/i,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader'
        }
      ]
    },
    output: {
      clean: true,
      filename: 'scripts/[name].js',
      path: path.resolve(__dirname, env['BUILD_PATH'])
    },
    plugins: [
      new HtmlPlugin({
        template: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css'
      })
    ],
    devServer: {
      host: env['DEV_SERVER_HOST'],
      port: env['DEV_SERVER_PORT'],
      open: true,
      hot: true
    }
  };
};

