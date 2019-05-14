import * as path from 'path';

import {baseConfig} from './base.config';

module.exports = {
  ...baseConfig,
  mode: 'production',
  entry: {
    magentaimage: './src/lib.ts',
  },
  output:
      {filename: 'magentaimage.js', path: path.resolve(__dirname, '../dist')},
  optimization: {minimize: true},
};
