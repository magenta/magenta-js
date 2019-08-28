import * as path from 'path';
import {baseConfig} from './es6.base.config';

module.exports = {
  ...baseConfig,
  output: {
    filename: '[name].js',
    chunkFilename: '_lib/[name].js',
    globalObject: 'self',
    library: '[name]',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../es6')
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {loader: 'ts-loader', options: {configFile: 'tsconfig.es6.json'}}
    }],
  },
  // Don't package these huge dependencies with the bundles, since we'd
  // be downloading duplicates.
  externals: {
    'tone': {commonjs: 'Tone', commonjs2: 'Tone', amd: 'Tone', root: 'Tone'},
    '@tensorflow/tfjs': {commonjs: 'tf', commonjs2: 'tf', amd: 'tf', root: 'tf'}
  }
};
