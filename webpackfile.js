const plugins = [
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
];

const babelJsxModule = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        plugins
      }
    }
  ]
};

module.exports = [
  { // /p/{podcast}
    entry: __dirname + '/src/client/index.js',
    output: {
      path: __dirname + '/dist/public/js',
      filename: 'app.js'
    },
    module: babelJsxModule
  },
  { // Service-worker
    entry: __dirname + '/src/service-worker/index.js',
    output: {
      path: __dirname + '/dist/public',
      filename: 'sw.js'
    },
    module: babelJsxModule
  }
];
