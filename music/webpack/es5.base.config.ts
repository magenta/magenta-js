export const baseConfig = {
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {loader: 'ts-loader', options: {configFile: 'tsconfig.es5.json'}}
    }],
  },
  node: {fs: 'empty'},
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
