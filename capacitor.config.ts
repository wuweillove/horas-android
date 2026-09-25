import type { CapacitorConfig } from "@capacitor/cli";

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
  },
  plugins: {
    AdMob: {
      appId: "ca-app-pub-3940256099942544~3347511713",
    },
  },
};

export default config;
