const babelRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    plugins: [
      ['transform-react-jsx', {pragma: 'h'}],
      'babel-plugin-transform-object-rest-spread',
      'babel-plugin-transform-async-to-generator',
      'check-es2015-constants',
      'transform-es2015-arrow-functions',
      'transform-es2015-block-scoped-functions',
      'transform-es2015-block-scoping',
      'transform-es2015-destructuring',
      'transform-es2015-shorthand-properties',
      'transform-es2015-spread',
      'transform-es2015-template-literals'
    ]
  }
};

module.exports = [
  { // App
    entry: __dirname + '/src/client/index.js',
    output: {
      path: __dirname + '/dist/public/js',
      filename: 'app.js'
    },
    module: {
      rules: [
        babelRule,
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loaders: [
            {loader: 'style-loader'},
            {loader: 'css-loader', query: {
              modules: true,
              camelCase: 'dashesOnly',
              localIdentName: '[local]_[hash:base64:6]'
            }},
            {loader: 'sass-loader'}
          ]
        }
      ]
    }
  },
  { // Service-worker
    entry: __dirname + '/src/service-worker/index.js',
    output: {
      path: __dirname + '/dist/public',
      filename: 'sw.js'
    },
    module: {
      rules: [
        babelRule
      ]
    }
  }
];
