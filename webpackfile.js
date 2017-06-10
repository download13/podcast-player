const babelJsxModule = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['babel-preset-es2015', {modules: false}]
        ],
        plugins: [
          ['transform-react-jsx', {pragma: 'h'}],
          'babel-plugin-transform-object-rest-spread',
          'babel-plugin-transform-async-to-generator'
        ]
      }
    }
  ]
};

module.exports = [
  { // /p/{podcast}
    entry: __dirname + '/src/player/index.js',
    output: {
      path: __dirname + '/dist/public/js',
      filename: 'player.js'
    },
    module: babelJsxModule
  },
  { // /sync
    entry: __dirname + '/src/sync/index.js',
    output: {
      path: __dirname + '/dist/public/js',
      filename: 'sync.js'
    },
    module: babelJsxModule
  },
  { // Service-worker
    entry: __dirname + '/src/service-worker/index.js',
    output: {
      path: __dirname + '/dist/public',
      filename: 'sw.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['babel-preset-es2015', {modules: false}]
            ]
          }
        }
      ]
    }
  }
];
