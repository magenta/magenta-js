import * as fs from 'fs';
import * as path from 'path';

import {baseConfig} from './base.config';

const getDemos = source => {
  return fs.readdirSync(source)
      .filter(name => path.extname(name) === '.html' && name !== 'index.html')
      .map(name => path.basename(name, '.html'));
};

const entries = getDemos('./demos').reduce((obj, name) => {
  obj[name] = `./demos/${name}.ts`;
  return obj;
}, {});

module.exports = {
  ...baseConfig,
  devtool: 'inline-source-map',
  mode: 'development',
  entry: {
    ...entries,
  },
  output: {
    filename: '[name]_bundle.js',
    path: path.resolve(__dirname, '../demos'),
  },
};
