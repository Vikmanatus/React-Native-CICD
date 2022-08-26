/**
 * This script is used to get the version number, the code version or the build number
 * The script must be called with an argument: --required
 * Then you can pass a value: <build-number|code-version|version-number>
 * Example to call the script:  node ./scripts/build/scripts/versioning.js --required version-number
 */

import versionFile from '../version.json';
import {isArgumentValid} from './utils';
import {AuthorizedArguments, AuthorizedValues, VersionFileType} from './utils/types';

const versionning: VersionFileType = versionFile;

/**
 * This function is used to generate the proper version number based on the array contained inside the key "version" located in file version.json
 * @returns {string} : The proper version number who will be passed to the deployment environment to set the proper version number
 */
const generateVersionNumber = (): string => {
  return versionning.version.join('.');
};
const errorText =
  'Invalid calling of script, this scripts requires an argument called "required" followed by the desired value.\nThe only allowed values for this argument are: <version-number|code-version|build-number>\nExample: node ./scripts/versioning.js --required version-number';
const isVersionNumberArgument = isArgumentValid(AuthorizedArguments.REQUIRED, process.argv);

const isVersionNumberRequired = isArgumentValid(AuthorizedValues.VERSION_NUMBER, process.argv);
const isCodeNumberRequired = isArgumentValid(AuthorizedValues.CODE_VERSION, process.argv);
const isBuildNumberRequired = isArgumentValid(AuthorizedValues.BUILD_NUMBER, process.argv);

if (isVersionNumberArgument && isVersionNumberRequired) {
  console.log(generateVersionNumber());
} else if (isVersionNumberArgument && isCodeNumberRequired) {
  console.log(versionning.releaseAndroid);
} else if (isVersionNumberArgument && isBuildNumberRequired) {
  console.log(versionning.releaseIos);
} else {
  throw Error(errorText);
}
