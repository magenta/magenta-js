const Terser = require('terser-webpack-plugin');
const path = require('path');
const glob = require('glob');

const src = path.resolve(__dirname, '../src');
const matches = glob.sync('*.ts', { cwd: src });

const entries = matches.reduce((entries, entry) => {
  if (!entry.match(/test|\.d\./)) {
    entries[entry.replace(/\.ts$/, '')] = './' + entry;
  }
	return entries;
}, {});

module.exports = {
	mode: 'production',
	context: src,
  entry: entries,
	output: {
    filename: '[name].js',
    chunkFilename: '_lib/[name].js',
    globalObject: 'self',
    library: 'mm',
    libraryTarget: 'umd',
		path: path.resolve(__dirname, '../es6')
  },
	optimization: {
    minimize: true,
    minimizer: [
      new Terser({
        terserOptions: {
          ecma: 8
        },
        parallel: true
      })
    ]
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader',
      // query: {
      //   // configFileName: path.resolve(__dirname, 'tsconfig.es6.json'),
      //   useBabel: true,
      //   babelCore: "@babel/core"
      // }
    }],
  },

  // if bundling for Node/Webpack usage, don't bundle node_modules
  externals: require('webpack-node-externals')(),

  resolve: {
    extensions: [ '.ts', '.js' ],
  },

  node: {
    fs: 'empty'
  }
};
