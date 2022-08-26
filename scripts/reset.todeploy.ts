/**
 * This script will be used to reset the array toDeploy in the version.json file
 * Example to call the script: node ./scripts/build/scripts/reset.todeploy.js
 */

import {readFilePromise, writeFilePromise} from './utils';
import {VersionFileType} from './utils/types';

const fileName = './version.json';
const ENCODING = 'utf8';

readFilePromise(fileName, ENCODING)
  .then(result => {
    const parsedJson = JSON.parse(result);
    // Rewriting proper object
    const values: VersionFileType = {
      ...parsedJson,
      toDeploy: [],
    };
    const stringifiedObject = JSON.stringify(values, null, 4);

    writeFilePromise(fileName, stringifiedObject)
      .then(response => {
        return response;
      })
      .catch((err: NodeJS.ErrnoException) => {
        throw Error(err.message);
      });
  })
  .catch((err: NodeJS.ErrnoException) => {
    throw Error(err.message);
  });
