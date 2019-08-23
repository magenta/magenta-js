const Terser = require('terser-webpack-plugin');
const path = require('path');
// import { baseConfig } from './base.config';
const glob = require('glob');

const src = path.resolve(__dirname, '../src');
// const matches = glob.sync('{*/*.ts,index.ts,lib.ts}', { cwd: src });
const matches = glob.sync('*.ts', { cwd: src });

const entries = matches.reduce((entries, entry) => {
	// const name = (entry.match(/([^\/]+)(\/index)?\.ts$/) || [])[1];
  // entries[name] = entry;
  if (!entry.match(/test|\.d\./)) {
    entries[entry.replace(/\.ts$/, '')] = './' + entry;
  }
	return entries;
}, {});

console.log(src, matches, entries);

module.exports = {
	// ...baseConfig,
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

  resolve: {
    extensions: [ '.ts', '.js' ],
  },

  node: {
    fs: 'empty'
  }
};
