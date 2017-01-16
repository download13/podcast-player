module.exports = [
  { // Client app
    entry: './src/client/index.js',
    output: {
      path: './dist/public/js',
      filename: 'app.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['babel-preset-es2015', {modules: false}]
            ],
            plugins: [
              ['transform-react-jsx', {pragma: 'h'}],
              'babel-plugin-transform-object-rest-spread'
            ]
          }
        }
      ]
    }
  },
  { // Service-worker
    entry: './src/client/sw.js',
    output: {
      path: './dist/public',
      filename: 'sw.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['babel-preset-es2015', {modules: false}]
            ]
          }
        }
      ]
    }
  },
  { // Server
    entry: './src/server/index.js',
    target: 'node',
    node: {
      __dirname: false
    },
    output: {
      path: './dist',
      filename: 'server.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [
              ['babel-preset-es2015', {modules: false}]
            ],
            plugins: [
              'babel-plugin-transform-object-rest-spread'
            ]
          }
        }
      ]
    },
    externals: {
      'express': 'commonjs2 express',
      'express-handlebars': 'commonjs2 express-handlebars',
    }
  }
];
