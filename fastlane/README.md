fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### format_versioning_element

```sh
[bundle exec] fastlane format_versioning_element
```

Formatting version numbers for production release

### sync_and_update_versioning_element

```sh
[bundle exec] fastlane sync_and_update_versioning_element
```

Synchronizing if required and incrementing version numbers for App Center release

### install_versioning_dependencies

```sh
[bundle exec] fastlane install_versioning_dependencies
```

Installing versioning scripts dependencies

### compile_versioning_scripts

```sh
[bundle exec] fastlane compile_versioning_scripts
```

Compiling Typescripts version handling files to Javascript

### check_versioning_integrity

```sh
[bundle exec] fastlane check_versioning_integrity
```

Check version file integrity

----


## Android

### android check_play_store_api_access

```sh
[bundle exec] fastlane android check_play_store_api_access
```

Check Play Console API access

### android compile_android_app

```sh
[bundle exec] fastlane android compile_android_app
```

Compile Android release in chosen type passed by parameter

### android check_appcenter_latest_release_info

```sh
[bundle exec] fastlane android check_appcenter_latest_release_info
```

Fetch AppCenter latest release

### android update_android_version

```sh
[bundle exec] fastlane android update_android_version
```

Update Android code version and build number

### android release

```sh
[bundle exec] fastlane android release
```

Release Android application

----


## iOS

### ios update_ios_version

```sh
[bundle exec] fastlane ios update_ios_version
```

Update iOS version code and build number

### ios release

```sh
[bundle exec] fastlane ios release
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
