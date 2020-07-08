import * as path from 'path';
import * as webpack from 'webpack';
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
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /\/core\/compat\/timer\.ts/,
      path.resolve(__dirname, '../src/core/compat/timer_node.ts')
    ),
    new webpack.NormalModuleReplacementPlugin(
      /\/core\/compat\/fetch\.ts/,
      path.resolve(__dirname, '../src/core/compat/fetch_node.ts')
    ),
  ]
};
