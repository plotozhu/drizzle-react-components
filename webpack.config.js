const path = require('path');

process.env.BABEL_ENV = 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'qz-drizzle-components.js',
    library: 'qz-drizzle-components',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.(js)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader',
      options: {
        presets: ['react'],
        plugins: [require('babel-plugin-transform-class-properties'), require('babel-plugin-transform-object-rest-spread')]
      }
    }]
  },
  externals: [
    'drizzle',
    'drizzle-react',
    'prop-types',
    'react',
    'redux'
  ]
};
