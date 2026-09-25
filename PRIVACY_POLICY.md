# Horas privacy policy

Horas is a freelancer time desk. This policy covers the Android app distributed as `com.horas.app`.

## Data the app stores on the device

Hours, breaks, comments, jobs, clients, rates, invoice drafts, and settings stay on the phone. They are written to the app's private storage (web storage inside the app sandbox). They are not uploaded by Horas itself.

If you sign in with Google, the app receives your Google account id, name, and email, and uses them only to derive a desk id so two of your devices can share one encrypted copy of that desk. The hours payload is encrypted on the device before it is sent. Horas does not receive your Google password.

A backup file is created only when you tap Download backup. Restoring a backup reads a file you choose.

## Data Google AdMob and the User Messaging Platform collect

Advertising runs only in the Android app, and only after the Google consent form (User Messaging Platform) says ads may be requested. If you do not consent, the app does not request ads.

When ads are allowed, Google AdMob may process:

- Advertising identifier (AAID)
- IP address and coarse location derived from it
- Device and app identifiers used to prevent fraud and limit how often an ad is shown
- Diagnostic data about which ad was shown and whether it failed
- The consent choice you make in the UMP form

Horas does not sell hours, client names, invoice contents, or comments to advertisers. Those fields are not sent as ad targeting.

Google's own description of what AdMob collects is at https://policies.google.com/privacy and https://support.google.com/admob/answer/6128543.

## Permissions

Declared by Horas:

- Internet: to load ads, the consent form, and an optional encrypted desk sync
- Notifications: to show a persistent notification while a clock is running
- Foreground service (`specialUse`): so Android does not freeze that clock when you leave the app

The Google Mobile Ads SDK also merges these, and they are required for ads to function:

- Advertising ID and the Android Ad Services permissions
- Network state
- Wake lock, used by the ads SDK while an ad is on screen

The app does not request location, contacts, camera, microphone, or SMS.

## Children

Horas is a work tool. It is not directed at children under 13.

## Contact

The publisher is [wuweillove](https://github.com/wuweillove). This policy is published at https://pepitoloco.zo.space/horas-privacy.
