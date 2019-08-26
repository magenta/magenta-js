import * as path from 'path';
import * as nodeExternals from 'webpack-node-externals';
import {baseConfig} from './es6.base.config';

module.exports = {
  ...baseConfig,
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.es6.json',
          compilerOptions: {outDir: './node'}
        }
      }
    }],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '_lib/[name].js',
    library: 'mm',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../node'),
    globalObject: 'global'
  },
  // If bundling for Node/Webpack usage, don't bundle node_modules.
  externals: nodeExternals(),
};
