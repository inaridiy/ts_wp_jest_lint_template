const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: 'development',

  entry: './src/main.ts',

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          // Use `.swcrc` to configure swc
          loader: 'swc-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/index.html'),
    }),

    /*new CopyPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'static',
        },
      ],
    }),*/
  ],
  target: ['web', 'es5'],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: true,
    compress: true,
    hot: true,
  },
};
module.exports = (env, argv) => {
  console.log(argv);
  if (argv.mode !== 'production') {
    config.target = 'web';
  }
  if (argv.mode === 'production') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
  return config;
};
