const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');


//different environments
const isProd = (process.env.NODE_ENV === 'production');
const isDev = (process.env.NODE_ENV === 'development');


module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  resolve: {
    extensions: ['.ts', '.tsx', '*', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  mode: 'none',
  output: {
    filename: '[name]-script-bundle.js',
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/',
    hotUpdateChunkFilename: 'hot-update.js',
    hotUpdateMainFilename: 'hot-update.json'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../dist'),
    index: 'index.html',
    historyApiFallback: true,
    writeToDisk: true,
    overlay: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
    stats: {
      colors: true
    },
  },
  devtool: (function(){
    const forDevOnly = (isDev) ? 'source-map' : 'none';
    return forDevOnly;
  }()),
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          
        }],
        exclude: /node_modules/
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {test: /\.glb$/,
        loader: 'file-loader?name=[name].[ext]',
        options: {
          outputPath: './images',
          context: './src/component/images'
        }
      },

      {
        test: /\.css$/,
        use: [ 
          { // inject css into the html
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          { 
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [
                require('autoprefixer')({
                  'overrideBrowserslist': ['> 2%', 'last 2 versions']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: (function() {
          let separate = [
            { loader: MiniCSSExtractPlugin.loader},
            { loader: 'css-loader',
              options: {
                url: false
              }},
            { loader: 'postcss-loader',
              options: {
                indent: 'postcss',
                plugins: [
                  require('autoprefixer')({
                    'browsers': ['> 1%', 'last 2 versions']
                  })
                ]
              }
            },
            { loader: 'stylus-loader'}
          ];

          if (isDev) separate.unshift({loader: 'css-hot-loader'});
          return separate;
        }())
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
          }

        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [ 
          {
            loader: 'responsive-loader',
            options: {
              sizes: [192, 300, 600, 1200, 2000],
              outputPath: 'images',
              name: '[name]-[width].[ext]',
              // adapter: require('responsive-loader/sharp')
            },
          },
        ]
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'raw-loader'
      // },
      {
        test: /\.(png|jp?g|gif|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: (function() {
    let plugins = [];

    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'PATH_PREFIX': JSON.stringify(process.env.PATH_PREFIX)
        }
      }),
      new OptimizeCSSAssetsPlugin(),
      new MiniCSSExtractPlugin({
        filename: 'bundled-style.css',
        chunkFilename: '[id].css'
      }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        filename: path.resolve(__dirname, '../dist/index.html'),
      }),
      new CopyPlugin( [
        //send service worker and manifest over to dist folder
        // { from: path.resolve(__dirname, '../src/sw.js'), to: path.resolve(__dirname, '../dist/sw.js')},
        { from: path.resolve(__dirname, '../src/manifest.json'), to: path.resolve(__dirname, '../dist/manifest.json')}
      ])
      // new CleanWebpackPlugin(),
      // new CopyPlugin([
      //   { from: '../components/images', to: 'images'}
      // ])
    );

    if (isDev) {
      plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
          path: path.resolve(__dirname, '../.env')
        }),
      );
    } else if (isProd) {
      plugins.push(
        new Dotenv({
          systemvars: true,
        }),
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: true,
          terserOptions: {
            mangle: true,
          }
        }),
        new CompressionPlugin({
          algorithm: 'gzip'
        }),
        new BrotliPlugin({
          asset: '[path].br[query]',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    return plugins;

  }())
};