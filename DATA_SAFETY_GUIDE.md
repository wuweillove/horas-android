# Play Console data safety

Use this when you fill **App content → Data safety** for Horas. Answer from the behavior in this repository, then confirm against your production AdMob account.

## Data collected by Horas

| Data | Collected | Shared | Purpose | Optional | Encrypted in transit |
| --- | --- | --- | --- | --- | --- |
| Name, email address | Only if the user signs in with Google | No | Account / app functionality | Yes | Yes (HTTPS, and the desk blob is encrypted before upload) |
| App activity: hours, comments, clients, invoices | Stored on device | No | App functionality | No | The optional sync upload is encrypted |
| Files | Only a backup the user exports or restores | No | App functionality | Yes | The file stays on device unless the user moves it |

Do not declare location, contacts, photos, or financial info as collected by Horas. Invoice amounts stay in the on-device desk.

## Data collected by AdMob (third party)

Declare Google AdMob as a third-party SDK. Typical Data safety answers when ads are enabled:

| Data | Collected | Shared | Purpose |
| --- | --- | --- | --- |
| Device or other IDs (advertising ID) | Yes | Yes, with Google | Advertising |
| App interactions (ad views, clicks) | Yes | Yes, with Google | Advertising, analytics |
| Diagnostics (crash and performance of the ads SDK) | Yes | Yes, with Google | Analytics |
| Approximate location (derived from IP) | Yes, by the SDK | Yes, with Google | Advertising |

Mark advertising data as optional in the sense that the UMP form can refuse ads. If `canRequestAds` is false, this build does not call the ad SDK to load an ad.

The app id and unit ids in source control are Google's **test** ids. Production ids go in `.env` and `android/local.properties` (`admob.app.id`).

The Ads SDK merges `AD_ID`, `ACCESS_ADSERVICES_AD_ID`, `ACCESS_ADSERVICES_ATTRIBUTION`, `ACCESS_ADSERVICES_TOPICS`, `ACCESS_NETWORK_STATE`, and `WAKE_LOCK`. Horas does not add location, contacts, camera, or microphone.

## Security section

- Data is encrypted in transit (HTTPS for sync and for Google ad requests).
- Users can request deletion of the on-device desk by clearing app storage. There is no Horas account server that retains a profile after sign-out beyond the encrypted blob stored for that desk id.
- The foreground-service notification shows the job name and elapsed time. It stays on the device.

## Ads declaration

In Play Console, complete the Ads declaration: the app contains ads. They are banner ads on Clients and Invoices, and an interstitial after exporting a PDF or marking an invoice sent or paid. No ad is requested while a clock is running.
