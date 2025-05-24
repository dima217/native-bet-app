# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native core
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Hermes
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# Allow JavaScript interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep native methods used by the bridge
-keepclassmembers class * {
    native <methods>;
}
