module.exports = function( config ) {
  config.set( {
    basePath: '',

    frameworks: ['jasmine'],

    // list of files/patterns to load in the browser
    files: ['spec.bundle.js'],

    preprocessors: {
      'spec.bundle.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',
      module : {
        preLoaders: [{
          test   : /\.js$/,
          include: "src/",
          exclude: [/node_modules/, /\.spec\.js/],
          loader : 'babel'
        }, {
          test   : /\.js$/,
          exclude: [/node_modules/, /\.spec\.js/],
          loader : 'babel-istanbul'
        }],
        loaders   : [
          {
            test   : /\.js$/,
            exclude: [/node_modules/],
            loader : 'babel'
          },
          {
            test   : /\.jade$/,
            exclude: [/node_modules/],
            loader : 'ng-cache!jade-html'
          },
          {
            test  : /\.scss$/,
            loader: 'style!css!sass!'
          },
          {
            test  : /\.html$/,
            loader: 'raw'
          }, {
            test  : /\.css$/,
            loader: 'style!css'
          }]
      }
    },

    webpackServer: {
      noInfo: true
    },

    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      reporters: [{
        type: 'lcov',
        dir : 'coverage/'
      }, {
        type: 'text'
      }]
    },

    // web server port
    port: 12345,

    // enable colors in the output
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS']

  } );
};