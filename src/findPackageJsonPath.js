// @flow

import fs from 'fs';
import path from 'path';
import {
  NotFoundError
} from './errors';

const findPackageJsonPath = (directoryPath: string): string => {
  const filePath = path.resolve(directoryPath, 'package.json');

  try {
    fs.accessSync(filePath, 4);

    return filePath;
  } catch (error) {
    if (error.code === 'ENOENT') {
      const nextDirectoryPath = path.resolve(directoryPath, '..');

      if (nextDirectoryPath === directoryPath) {
        throw new NotFoundError('package.json not found');
      }

      return findPackageJsonPath(nextDirectoryPath);
    } else {
      throw error;
    }
  }
};

export default findPackageJsonPath;
