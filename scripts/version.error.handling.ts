/**
 * This script is used to control the integretity of the structure of the version.json file values
 * Example to call the script: node ./scripts/build/scripts/version.error.handling.js
 * @param {Array<number>} version You will need to split your version number in an array, each digit will be separated by a coma
 * @param {string} releaseIos string constructed according to the rules of the build number. It must be a seven number digit constructed by the following way: version: 0.1.1 --> versionNumber: 0010100
 * @param {string} releaseAndroid string constructed according to the rules of the build number. It must be a seven number digit constructed by the following way: version: 0.1.1 --> versionNumber: 0010100
 * @param {Array<string>} toDeploy An array containing one or more of the two following values: <"ios"|"android">
 */

import versioning from '../version.json';
import {
  arrayCompare,
  generateErrorText,
  isArgumentValid,
  isInt,
  isStringifiedNumber,
} from './utils';
import {
  AllowedVersionFileTypes,
  AllowedVersionKeys,
  AllowedVersionTypes,
  AuthorizedArguments,
  TO_DEPLOY_VALUES,
  VersionFileType,
} from './utils/types';
const ARGS = process.argv;

const canSkipToDeploy = isArgumentValid(AuthorizedArguments.SKIP_TO_DEPLOY, ARGS) && process.env.FASTLANE_LOCAL_ENV === "true";

const versionFile: VersionFileType = versioning;
const allowedVersionFileKey: AllowedVersionFileTypes[] = [
  {key: AllowedVersionKeys.TO_DEPLOY, type: AllowedVersionTypes.ARRAY},
  {key: AllowedVersionKeys.VERSION, type: AllowedVersionTypes.ARRAY},
  {key: AllowedVersionKeys.RELEASE_IOS, type: AllowedVersionTypes.STRING},
  {key: AllowedVersionKeys.RELEASE_ANDROID, type: AllowedVersionTypes.STRING},
];

const allowedKeys = allowedVersionFileKey.map(element => element.key);
const actualFileKeys = Object.keys(versionFile);

const areKeysValids = arrayCompare(allowedKeys, actualFileKeys);

const allowedKeysText = `${allowedVersionFileKey.map(element => {
  return `- ${element.key}\n`;
})}`.replace(/,/g, '');

if (!areKeysValids) {
  throw Error(generateErrorText(allowedKeysText));
} else if (areKeysValids) {
  const checkTypes = allowedVersionFileKey.map(element => {
    if (element.type === AllowedVersionTypes.ARRAY) {
      return {
        isValid: Array.isArray(versionFile[element.key]),
        key: element.key,
      };
    }

    if (element.type === AllowedVersionTypes.STRING) {
      return {
        isValid: typeof versionFile[element.key] === AllowedVersionTypes.STRING,
        key: element.key,
      };
    }
  });
  const checkTypesErrors = checkTypes.filter(element => !element?.isValid);
  if (checkTypesErrors.length) {
    const authorizedKeys = `${allowedVersionFileKey.map(element => {
      return `- ${element.key} of type ${element.type}\n`;
    })}`.replace(/,/g, '');
    throw Error(generateErrorText(authorizedKeys));
  }
}

const MAX_INTEGER_SIZE = 2147483647;
const CODE_VERSION = versionFile.releaseAndroid;
const BUILD_NUMBER = versionFile.releaseIos;
const TO_DEPLOY = versionFile.toDeploy;

const areAllValuesNumbers = () => {
  return versionFile.version.every(element => {
    return typeof element === 'number' && isInt(element);
  });
};

const checkItemRequiredType = () => {
  const checkingKeys = [
    {key: AllowedVersionKeys.RELEASE_IOS, value: BUILD_NUMBER},
    {key: AllowedVersionKeys.RELEASE_ANDROID, value: CODE_VERSION},
  ];
  const filterErrors = checkingKeys.filter(
    element =>
      !isStringifiedNumber(element.value) ||
      !isInt(parseInt(element.value, 10)) ||
      parseInt(element.value, 10) >= MAX_INTEGER_SIZE,
  );
  return filterErrors;
};

const isVersionNumberValid = areAllValuesNumbers();

const isVersionCodeValid = checkItemRequiredType();

const checkToDeployContent =
  (TO_DEPLOY.includes(TO_DEPLOY_VALUES.IOS) ||
    TO_DEPLOY.includes(TO_DEPLOY_VALUES.ANDROID)) &&
  TO_DEPLOY.length <= 2 &&
  TO_DEPLOY.length > 0;

if (!isVersionNumberValid) {
  throw Error('All values specified in "version" array must be integers');
} else if (isVersionCodeValid.length) {
  const filterKeys = isVersionCodeValid.map(element => element.key).join(', ');
  const filterKeysSecondSentence = isVersionCodeValid
    .map(element => element.key)
    .join(' and ');
  throw Error(
    `There seems to be an error with the following keys: ${filterKeys}.\nPlease ensure that all the values in ${filterKeysSecondSentence} are integers and are lesser or equal than the maximum integer size of value ${MAX_INTEGER_SIZE}`,
  );
} else if (!checkToDeployContent && !canSkipToDeploy) {
  console.log({canSkipToDeploy});
  console.log("\n");
  throw Error(
    'There seems to be an error with the key "toDeploy"\nThe value must be an array containing maximum 2 string values, the only values allowed are: <android|ios>',
  );
} else {
  console.log('Valid file');
}
