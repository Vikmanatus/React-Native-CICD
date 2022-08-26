/**
 * This script will be used to sync build number and code version if their values are different
 * Example to call the script: node ./scripts/build/scripts/sync.versioning.js
 */

import versionFile from '../version.json';
import {formatIntBuildNumber, writeFilePromise} from './utils';
import {VersionFileType} from './utils/types';

const fileName = './version.json';

const versionning: VersionFileType = versionFile;

const BUILD_NUMBER = parseInt(versionFile.releaseIos, 10);

const CODE_VERSION = parseInt(versionFile.releaseAndroid, 10);

if (BUILD_NUMBER !== CODE_VERSION) {
  const versionArray = [
    {platform: 'ios', version: BUILD_NUMBER},
    {platform: 'android', version: CODE_VERSION},
  ];
  // This will return which number is greater than the other
  const largest = versionArray.sort((a, b) => a.version - b.version)[
    versionArray.length - 1
  ];

  const formatedBuildNumber = formatIntBuildNumber(largest.version);
  const overrideVersionFile: VersionFileType = {
    ...versionning,
    releaseAndroid: formatedBuildNumber,
    releaseIos: formatedBuildNumber,
  };

  const stringifiedObject = JSON.stringify(overrideVersionFile, null, 4);
  writeFilePromise(fileName, stringifiedObject)
    .then(success => {
      console.log('File successfully overwritten');
      return success;
    })
    .catch((err: NodeJS.ErrnoException) => {
      throw Error(err.message);
    });
}
