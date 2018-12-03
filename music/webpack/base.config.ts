export const baseConfig = {
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: 'ts-loader',
    }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
