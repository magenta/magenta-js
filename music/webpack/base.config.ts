import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

export const baseConfig = {
  module: {
    // rules: [{
    //   test: /\.ts$/,
    //   exclude: /node_modules/,
    //   use: 'ts-loader',
    // }],
    rules: [{
      // Include ts, and js files.
      //test: /\.(ts|js)?$/,
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader',
      query: {
        // Use this to point to your tsconfig.json.
        configFileName: 'tsconfig.es6.json',
        useBabel: true,
        babelCore: "@babel/core"
      }
  }],
  },

  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
};
