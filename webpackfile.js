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
          'babel-plugin-transform-object-rest-spread'
        ]
      }
    }
  ]
};

module.exports = [
  { // /p/{podcast}
    entry: './src/player/index.js',
    output: {
      path: './dist/public/js',
      filename: 'player.js'
    },
    module: babelJsxModule
  },
  { // /sync
    entry: './src/sync/index.js',
    output: {
      path: './dist/public/js',
      filename: 'sync.js'
    },
    module: babelJsxModule
  },
  { // Service-worker
    entry: './src/service-worker/index.js',
    output: {
      path: './dist/public',
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
