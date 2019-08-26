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
    library: '[name]',
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
      use: {loader: 'ts-loader', options: {configFile: 'tsconfig.es6.json'}}
    }],
  },
  // Don't package these huge dependencies with the bundles, since we'd
  // be downloading duplicates.
  externals: {
    'tone': {
      commonjs: 'Tone',
      commonjs2: 'Tone',
      amd: 'Tone',
      root: 'Tone'
    },
    '@tensorflow/tfjs': {
      commonjs: 'tf',
      commonjs2: 'tf',
      amd: 'tf',
      root: 'tf'
    }
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  node: {
    fs: 'empty'
  }
};
