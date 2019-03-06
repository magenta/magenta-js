export const baseConfig = {
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: 'ts-loader',
    }],
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
