# Versioning scripts

## `0.0.2`

- Refractoring of continous deployment scripts in `Typescript` for better handling error

- Updated Github Actions scripts to the lastest version of the versioning scripts

- For the moment the local fastlane environment is still handled by version numbers taken from the `.env` file of the `fastlane` folder

Improvements:

- Added automatic synchronization on build numbers in continous deployment when releases are made to `AppCenter`

- If there is a type error in the `version.json` file, the linter of your code editor should highlight an error in the various scripts where the `version.json` file is used

## `0.0.1`

Original continious deployement scripts: 

- Scripts written in javascript, only used to handle continous deployment throught `Github Actions`
 
- Fastlane versioning is locally handled with `.env` file from the `fastlane` folder

- The versioning in continuous deployment is handled by the scripts located at `../scripts/*.js`

Continous deployment:

  - Supporting `iOS` and `Android` deployment to AppCenter for `int` environment

  - Supporting iOS deployment in `Testflight`, the production envrionment for `Android` is temporary set to `AppCenter`
