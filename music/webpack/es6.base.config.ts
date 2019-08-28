import * as glob from 'glob';
import * as path from 'path';
import * as Terser from 'terser-webpack-plugin';

const src = path.resolve(__dirname, '../src');
const matches = glob.sync('*.ts', {cwd: src});

const entries = matches.reduce((entries, entry) => {
  if (!entry.match(/test|\.d\./)) {
    entries[entry.replace(/\.ts$/, '')] = './' + entry;
  }
  return entries;
}, {});

export const baseConfig = {
  mode: 'production',
  context: src,
  entry: entries,
  optimization: {
    minimize: true,
    minimizer: [new Terser({terserOptions: {ecma: 8}, parallel: true})]
  },
  node: {fs: 'empty'},
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
