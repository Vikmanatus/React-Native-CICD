/**
 * The utility of this script is to determine if the platform - passed as argument - is required to be builded
 * @param {string} platform : The key used to pass which platforms need to be checked. It is used as : "--platform <android|ios>"
 * @returns {boolean} : Returns if the requested platforms needs to be used
 * Example to call the script:  node ./scripts/build/scripts/required.release.js  --platform android
 */

import versionFile from '../version.json';
import {isArgumentValid} from './utils';
import {AuthorizedArguments, TO_DEPLOY_VALUES, VersionFileType} from './utils/types';

const versionning: VersionFileType = versionFile;

const errorText =
  'Invalid calling of script, this scripts requires an argument called "platform" followed by the desired value.\nThe only allowed values for this argument are: <ios|android>\nExample: node ./scripts/required.release.js --platform android';

const isPlatformArgumentValid = isArgumentValid(AuthorizedArguments.PLATFORM, process.argv);

const isAndroidContained = isArgumentValid(TO_DEPLOY_VALUES.ANDROID, process.argv);
const isIosContained = isArgumentValid(TO_DEPLOY_VALUES.IOS, process.argv);

if (isPlatformArgumentValid && (isAndroidContained || isIosContained)) {
  if (process.argv[3] === TO_DEPLOY_VALUES.IOS) {
    const isIosReleaseRequired = isArgumentValid(
      TO_DEPLOY_VALUES.IOS,
      versionning.toDeploy,
    );
    console.log(isIosReleaseRequired);
  }
  if (process.argv[3] === TO_DEPLOY_VALUES.ANDROID) {
    const isAndroidReleaseRequired = isArgumentValid(
      TO_DEPLOY_VALUES.ANDROID,
      versionning.toDeploy,
    );
    console.log(isAndroidReleaseRequired);
  }
} else {
  throw Error(errorText);
}
