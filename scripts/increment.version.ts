/**
 * This script will be used to increment the build number or/and code version
 * The script must be called with an argument: --required
 * Then you can pass up to two values which are: <build-number|code-version>
 * Example to call the script with a single argument: node ./scripts/build/scripts/increment.version.js --required code-version
 * Example to call the script with multiple arguments: node ./scripts/build/scripts/increment.version.js --required build-number code-version
 */

import {isArgumentValid, readFilePromise, writeFilePromise} from './utils';
import {AuthorizedArguments, AuthorizedValues, VersionFileType} from './utils/types';

const fileName = './version.json';
const ENCODING = 'utf8';

const ARGS = process.argv;
const validArgs =
  isArgumentValid(AuthorizedArguments.REQUIRED, ARGS) &&
  (isArgumentValid(AuthorizedValues.BUILD_NUMBER, ARGS) ||
    isArgumentValid(AuthorizedValues.CODE_VERSION, ARGS));

if (!validArgs) {
  throw Error(
    'Invalid calling of script.\nThe script must contain an argument called "required". The only allowed values are: <build-number|code-version>\nExample: node ./scripts/increment.version.js --required build-number code-version\nExample with single argument: node ./scripts/increment.version.js --required build-number',
  );
}

readFilePromise(fileName, ENCODING)
  .then(data => {
    const parsedJson: VersionFileType = JSON.parse(data);

    const isIosIncrementRequired = isArgumentValid(AuthorizedValues.BUILD_NUMBER, ARGS)
      ? incrementStringifiedNumeber(parsedJson.releaseIos)
      : parsedJson.releaseIos;
    const isAndroidIncrementRequired = isArgumentValid(
      AuthorizedValues.CODE_VERSION, ARGS
    )
      ? incrementStringifiedNumeber(parsedJson.releaseAndroid)
      : parsedJson.releaseAndroid;
    const values: VersionFileType = {
      ...parsedJson,
      releaseIos: isIosIncrementRequired,
      releaseAndroid: isAndroidIncrementRequired,
    };
    const stringifiedObject = JSON.stringify(values, null, 4);
    writeFilePromise(fileName, stringifiedObject)
      .then(success => {
        console.log('The file has been saved!');
        return success;
      })
      .catch((err: NodeJS.ErrnoException) => {
        throw Error(err.message);
      });
  })
  .catch((error: NodeJS.ErrnoException) => {
    throw Error(error.message);
  });

const incrementStringifiedNumeber = (value: string) => {
  const incrementedValue = parseInt(value, 10) + 1;
  if (value.charAt(0) === '0') {
    return `0${incrementedValue}`;
  }
  return incrementedValue.toString();
};
