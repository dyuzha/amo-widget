const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/script.ts', // точка входа виджета
  output: {
    path: path.resolve(__dirname, 'dist/widget'),
    filename: 'script.js',
    libraryTarget: 'amd',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@modules': path.resolve(__dirname, 'src/scripts/modules/'),
      '@utils': path.resolve(__dirname, 'src/scripts/utils/'),
    },
  },
  externals: {
    // jquery: 'jQuery',
    // 'lib/components/base/modal': 'AMOCRM.modal',
    // 'lib/components/base/modal': 'AMOCRM.template.modal',
    jquery: 'jquery',
    'lib/components/base/modal': 'amd lib/components/base/modal',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false, // минификация prod
  },
};
