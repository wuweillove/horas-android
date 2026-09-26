import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Application id for the Play listing. Change this before you publish
 * if com.horas.app is already taken. It must match applicationId in
 * android/app/build.gradle.
 */
const config: CapacitorConfig = {
  appId: "com.horas.app",
  appName: "Horas",
  webDir: "dist",
  android: {
    adjustMarginsForEdgeToEdge: "force",
    captureInput: true,
    useLegacyBridge: false,
  },
  server: {
    androidScheme: "https",
    hostname: "horas-gamma.vercel.app",
  },
};

export default config;
