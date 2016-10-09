/**
 * Created by hzou on 10/9/16.
 */
/**
 * Created by hzou on 7/2/16.
 */

  //SEE: https://webpack.github.io/docs/configuration.html

var path    = require( 'path' );
var webpack = require( 'webpack' );
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "source-map",
  // application entry point
  entry  : {
    "httpbackup"    : "./src/httpbackup.module.js",
    "httpbackup.min": "./src/httpbackup.module.js"
  },
  output : {
    filename: '[name].js',
    path    : "dist"
  },
  module : {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate!babel' }
    ]
  },
  plugins: [
    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    // new webpack.optimize.CommonsChunkPlugin( {
    //   name     : 'vendor',
    //   minChunks: function( module, count ) {
    //     var isVendor = module.resource && module.resource.indexOf( path.resolve( __dirname, 'src' ) ) === -1;
    //     // console.log( 'module.resource:', isVendor, module.resource );
    //     return isVendor;
    //   }
    // } ),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};