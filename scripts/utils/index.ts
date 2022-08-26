import fs from 'fs';
import {AllowedVersionKeys, CustomPromise} from './types';

/**
 * Function to determine if a specific key is contained in the array passed as arguments
 * @param {string} key The key searched
 * @param {string[]} array The array in which the key will be searched
 * @returns A boolean value determining if the key is contained in the array
 */
const isArgumentValid = (key: string, array: string[]): boolean => {
  return array.includes(key);
};

/**
 * Used to format the number's in the version array of the `version.json` file
 * @param value The number that need to be stringified
 * @returns A stringified version of the number
 */
const checkValueDigit = (value: number): string => {
  if (value >= 0 && value < 10) {
    return `0${value}`;
  }
  return value.toString();
};

/**
 * Write a specific file and returns the completion of the new content saved
 * @param {string} pathfile The path of the file desired to be written
 * @param {BufferEncoding} encoding The encoding chosen for the writing of the file
 * @returns The completion of the new content saved into the file
 */
const writeFilePromise = (
  pathfile: string,
  value: string,
): CustomPromise<boolean, NodeJS.ErrnoException> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathfile, value, err => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
};

/**
 * Read a specific file and returns it's content into a promise
 * @param {string} pathfile The path of the file desired to be readed
 * @param {BufferEncoding} encoding The encoding chosen for the reading of the file
 * @returns The content of the file
 */
const readFilePromise = (
  pathfile: string,
  encoding: BufferEncoding,
): CustomPromise<string, NodeJS.ErrnoException> => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathfile, encoding, (err, data: string) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

/**
 * Compare two array and returns a boolean to determine if the array's are equal
 * @param {AllowedVersionKeys} _arr1 The array containing the key's allowed in the `version.json` file
 * @param {string[]} _arr2 The array containing the key's of the `version.json` file
 * @returns A boolean determining if the two array are equals
 */
const arrayCompare = (_arr1: AllowedVersionKeys[], _arr2: string[]) => {
  if (
    !Array.isArray(_arr1) ||
    !Array.isArray(_arr2) ||
    _arr1.length !== _arr2.length
  ) {
    return false;
  }

  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort();
  const arr2 = _arr2.concat().sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

/**
 * Check if the value passed is a integer
 * @param {number} n The number who need's to be checked
 * @returns A boolean determining if the value passed is an integer
 */
const isInt = (n: number) => {
  return n % 1 === 0;
};

/**
 * This function will check if the value passed as string is a stringified number constrcuted according to the build number and code version rules
 * @param {string} value The value to check
 * @returns A boolean determining if the string passed is a stringified number compliant to the established rules
 */
const isStringifiedNumber = (value: string): boolean => {
  const regex = /^([0-9]){7}$/g;
  const isStringNumber = value.match(regex);
  if (isStringNumber) {
    return true;
  }
  return false;
};

/**
 * A function used to genered clean error message
 * @param {string} text The value to pass in the error
 * @returns An error message who can be directly passed in a javascript error
 */
const generateErrorText = (text: string): string => {
  const errorText = `There seems to be an error with the version.json file.\nThe only keys allowed are:\n${text}`;
  return errorText;
};

/**
 * Function used to reformat a build number or code version who is already an integer
 * @param {number} number The integer value of the build number or code version
 * @returns The stringified correct value of the number
 */
const formatIntBuildNumber = (number: number): string => {
  const stringifiedNumber = number.toString();
  if (stringifiedNumber.length < 7) {
    return `0${stringifiedNumber}`;
  }
  return stringifiedNumber;
};

export {
  writeFilePromise,
  arrayCompare,
  generateErrorText,
  readFilePromise,
  isStringifiedNumber,
  checkValueDigit,
  isArgumentValid,
  isInt,
  formatIntBuildNumber,
};
