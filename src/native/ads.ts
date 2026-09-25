import { Capacitor } from "@capacitor/core";
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdPosition,
  BannerAdSize,
} from "@capacitor-community/admob";

/** Google's public sample units. Production ids come from the environment, never from the repo. */
const TEST_BANNER = "ca-app-pub-3940256099942544/9214589741";
const TEST_INTERSTITIAL = "ca-app-pub-3940256099942544/1033173712";

const bannerId = import.meta.env.VITE_ADMOB_BANNER_ID || TEST_BANNER;
const interstitialId = import.meta.env.VITE_ADMOB_INTERSTITIAL_ID || TEST_INTERSTITIAL;
const testing = !import.meta.env.VITE_ADMOB_BANNER_ID;

let consentAllowsAds = false;
let started = false;
let bannerVisible = false;
let interstitialReady = false;

export function adsEnabled(): boolean {
  return Capacitor.isNativePlatform();
}

/** UMP runs before any ad request. No consent, no ads. */
export async function prepareAds(): Promise<void> {
  if (!adsEnabled() || started) return;
  started = true;
  try {
    await AdMob.initialize({ initializeForTesting: testing });
    let consent = await AdMob.requestConsentInfo();
    if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
      consent = await AdMob.showConsentForm();
    }
    consentAllowsAds = consent.canRequestAds;
  } catch {
    consentAllowsAds = false;
  }
}

/** Adaptive banner above the bottom navigation, only on list and report screens. */
export async function setReportBanner(show: boolean): Promise<void> {
  if (!adsEnabled()) return;
  document.documentElement.classList.toggle("ad-banner", show && consentAllowsAds);
  if (!consentAllowsAds) return;
  try {
    if (show && !bannerVisible) {
      await AdMob.showBanner({
        adId: bannerId,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 56,
        isTesting: testing,
      });
      bannerVisible = true;
    } else if (!show && bannerVisible) {
      await AdMob.hideBanner();
      bannerVisible = false;
    }
  } catch {
    bannerVisible = false;
    document.documentElement.classList.remove("ad-banner");
  }
}

/**
 * Full-screen ad after a finished billing step (PDF or sent/paid).
 * Never while a clock is running.
 */
export async function showTransitionAd(clockRunning: boolean): Promise<void> {
  if (!adsEnabled() || !consentAllowsAds || clockRunning) return;
  try {
    if (!interstitialReady) {
      await AdMob.prepareInterstitial({ adId: interstitialId, isTesting: testing });
      interstitialReady = true;
    }
    await AdMob.showInterstitial();
    interstitialReady = false;
  } catch {
    interstitialReady = false;
  }
}
