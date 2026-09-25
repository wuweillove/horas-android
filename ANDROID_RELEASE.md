# Android release

Horas for Android is this repository. The web desk stays in `wuweillove/horas`. Application id: `com.horas.app` (`capacitor.config.ts` and `android/app/build.gradle`). Change both together before the first Play upload if that id is taken.

Target SDK is 36, which is what Play requires for new apps and updates from 31 August 2026.

## Debug build

```bash
npm install
npm run android:debug
```

The APK is `android/app/build/outputs/apk/debug/app-debug.apk`.

`npm run cap:sync` rebuilds the web assets and copies them into the Android project. `npm run cap:open` opens Android Studio.

## Production keystore

Create it once and keep the file and passwords outside the repo. `android/.gitignore` ignores `*.jks` and `*.keystore`.

```bash
keytool -genkeypair -v \
  -keystore horas-release.jks \
  -alias horas \
  -keyalg RSA -keysize 2048 -validity 10000
```

Put `horas-release.jks` somewhere outside the project, for example `~/keystores/horas-release.jks`.

Add this to `android/keystore.properties` (do not commit it):

```properties
storeFile=/absolute/path/horas-release.jks
storePassword=REPLACE
keyAlias=horas
keyPassword=REPLACE
```

Then, in `android/app/build.gradle`, inside `android { }`, add:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
    signingConfigs {
        release {
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }
    buildTypes.release.signingConfig signingConfigs.release
}
```

Release builds already enable R8 (`minifyEnabled` and `shrinkResources`).

## App bundle

```bash
npm run cap:sync
npm run android:bundle
```

The bundle is `android/app/build/outputs/bundle/release/app-release.aab`. Upload that file in Play Console. Enroll in Play App Signing and let Google hold the app signing key. The keystore above is the upload key.

## AdMob ids

Debug and CI use Google's test ids. For production:

1. Create an app in AdMob and a GDPR message in Privacy & messaging (UMP).
2. Set `admob.app.id` in `android/local.properties` to the AdMob **app** id (`ca-app-pub-…~-…`).
3. Set `VITE_ADMOB_BANNER_ID` and `VITE_ADMOB_INTERSTITIAL_ID` in `.env` to the production **unit** ids, then run `npm run cap:sync` again.

The banner is an adaptive banner on Clients and Invoices, above the navigation. The interstitial runs after a PDF export or when an invoice becomes sent or paid, and it is skipped while a clock is running. UMP consent is requested before any ad load.

## Foreground clock

While a clock is running, `TimerService` is a special-use foreground service with a low-importance notification. Play Console will ask you to declare that special-use type and to justify it: the notification shows the job and elapsed time so the clock is not frozen in the background. The only runtime permission Horas asks for is notifications. The Google Mobile Ads SDK also merges advertising-id, network-state, and wake-lock permissions.
