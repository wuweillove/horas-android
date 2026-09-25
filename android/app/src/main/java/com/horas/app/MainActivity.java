package com.horas.app;

import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebSettings;

import androidx.core.view.WindowCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(TimerPlugin.class);
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        CookieManager cookies = CookieManager.getInstance();
        cookies.setAcceptCookie(true);
        cookies.setAcceptThirdPartyCookies(getBridge().getWebView(), true);
        WebSettings settings = getBridge().getWebView().getSettings();
        settings.setUserAgentString(settings.getUserAgentString().replace("; wv", ""));
    }
}
