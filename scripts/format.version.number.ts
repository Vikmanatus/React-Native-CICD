/**
 * This script will be used to format the build number and code version according to the values passed in the version array of the version.json file
 * The script must be called with an argument: --required
 * Then you can pass up to two values which are: <build-number|code-version>
 * Example to call the script with a single argument: node ./scripts/format.version.number.js --required code-version
 * Example to call the script with multiple arguments: node ./scripts/format.version.number.js --required build-number code-version
 * TODO: Error handling can be improved in this script, feel free to contribute 😇
 */

import {
  checkValueDigit,
  isArgumentValid,
  readFilePromise,
  writeFilePromise,
} from './utils';
import {
  AuthorizedArguments,
  AuthorizedValues,
  VersionFileType,
} from './utils/types';
import versioning from '../version.json';

const fileName = './version.json';
const ENCODING = 'utf8';

const versionFile: VersionFileType = versioning;

const versionNumber = versionFile.version;

const ARGS = process.argv;

/**
 * Defining the rules to validate the call of the script
 */
const validArgs =
  isArgumentValid(AuthorizedArguments.REQUIRED, ARGS) &&
  (isArgumentValid(AuthorizedValues.BUILD_NUMBER, ARGS) ||
    isArgumentValid(AuthorizedValues.CODE_VERSION, ARGS));

if (!validArgs) {
  throw Error(
    'Invalid calling of script.\nThe script must contain an argument called "required". The only allowed values are: <build-number|code-version>\nExample: node ./scripts/format.version.number.js --required build-number code-version\nExample with single argument: node ./scripts/format.version.number.js --required build-number',
  );
}

let finalString = '';

finalString += versionNumber[0];

finalString += checkValueDigit(versionNumber[1]);

finalString += checkValueDigit(versionNumber[2]);

finalString += '00';
console.log({finalString});

readFilePromise(fileName, ENCODING)
  .then(data => {
    const parsedJson: VersionFileType = JSON.parse(data);
    const isIosRefractoredRequired = isArgumentValid(
      AuthorizedValues.BUILD_NUMBER,
      ARGS,
    )
      ? finalString
      : parsedJson.releaseIos;
    const isAndroidRefractoredRequired = isArgumentValid(
      AuthorizedValues.CODE_VERSION,
      ARGS,
    )
      ? finalString
      : parsedJson.releaseAndroid;

    const values: VersionFileType = {
      ...parsedJson,
      releaseIos: isIosRefractoredRequired,
      releaseAndroid: isAndroidRefractoredRequired,
    };
    const stringifiedObject = JSON.stringify(values, null, 4);
    writeFilePromise(fileName, stringifiedObject)
      .then(success => {
        return success;
      })
      .catch((err: NodeJS.ErrnoException) => {
        throw Error(err.message);
      });
  })
  .catch((error: NodeJS.ErrnoException) => {
    throw Error(error.message);
  });
