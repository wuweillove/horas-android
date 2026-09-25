package com.horas.app;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.content.ContextCompat;

import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
    name = "Timer",
    permissions = {
        @Permission(strings = { Manifest.permission.POST_NOTIFICATIONS }, alias = "notifications")
    }
)
public class TimerPlugin extends Plugin {
    @PluginMethod
    public void start(PluginCall call) {
        if (Build.VERSION.SDK_INT >= 33 && getPermissionState("notifications") != PermissionState.GRANTED) {
            requestPermissionForAlias("notifications", call, "onNotificationPermission");
            return;
        }
        launch(call);
    }

    @PermissionCallback
    private void onNotificationPermission(PluginCall call) {
        if (Build.VERSION.SDK_INT >= 33
            && ContextCompat.checkSelfPermission(getContext(), Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            JSObject result = new JSObject();
            result.put("shown", false);
            call.resolve(result);
            return;
        }
        launch(call);
    }

    @PluginMethod
    public void update(PluginCall call) {
        launch(call);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        Intent intent = new Intent(getContext(), TimerService.class);
        getContext().stopService(intent);
        call.resolve();
    }

    private void launch(PluginCall call) {
        Intent intent = new Intent(getContext(), TimerService.class);
        intent.putExtra(TimerService.EXTRA_TITLE, call.getString("title", "Horas"));
        intent.putExtra(TimerService.EXTRA_BODY, call.getString("body", "Clock running"));
        ContextCompat.startForegroundService(getContext(), intent);
        JSObject result = new JSObject();
        result.put("shown", true);
        call.resolve(result);
    }
}
