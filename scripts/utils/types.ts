/**
 * This enum describes the allowed arguments to call the script
 */
export enum AuthorizedArguments {
  REQUIRED = '--required',
  PLATFORM = '--platform',
  SKIP_TO_DEPLOY= '--skip-to-deploy-check'
}

/**
 * Type describing the types of the version.json file
 */
export type VersionFileType = {
  version: number[];
  releaseIos: string;
  releaseAndroid: string;
  toDeploy: string[];
};

/**
 * This enum describes the allowed values to be used to call the script
 */
export enum AuthorizedValues {
  BUILD_NUMBER = 'build-number',
  CODE_VERSION = 'code-version',
  VERSION_NUMBER = 'version-number'
}

/**
 * Describes the name's of the keys allowed in the `version.json` file
 */
export enum AllowedVersionKeys {
  TO_DEPLOY = 'toDeploy',
  VERSION = 'version',
  RELEASE_IOS = 'releaseIos',
  RELEASE_ANDROID = 'releaseAndroid',
}

/**
 * Describes the types allowed for the key's of `version.json`
 */
export enum AllowedVersionTypes {
  ARRAY = 'array',
  STRING = 'string',
}

/**
 * Describes the allowed syntax of the arguments to call the script
 */
export enum TO_DEPLOY_VALUES {
  IOS = 'ios',
  ANDROID = 'android',
}

/**
 * Custom type used to describe separately the type of the resolve() and the reject()
 */
export type CustomPromise<T, F = any> = {
  catch<TResult = never>(
    onrejected?:
      | ((reason: F) => TResult | PromiseLike<TResult>)
      | undefined
      | null,
  ): Promise<T | TResult>;
} & Promise<T>;

/**
 * Describes the key's and type's allowed in the `version.json` file
 */
export type AllowedVersionFileTypes = {
  key: AllowedVersionKeys;
  type: AllowedVersionTypes;
};

// export type CheckIncrementType = {
//   versionNumber: string;
//   isIncrementRequired: boolean;
//   platform: PlatformTypes;
// };

// export enum PlatformTypes {
//   IOS = 'ios',
//   ANDROID = 'android',
// }
