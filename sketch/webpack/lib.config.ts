import * as path from 'path';

import {baseConfig} from './base.config';

module.exports = {
  ...baseConfig,
  mode: 'production',
  entry: {
    magentasketch: './src/lib.ts',
  },
  output:
      {filename: 'magentasketch.js', path: path.resolve(__dirname, '../dist')},
  optimization: {minimize: true},
};
