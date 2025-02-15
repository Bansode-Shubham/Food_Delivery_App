import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * A blur view that matches the native tab bar appearance on iOS.
 *
 * It uses the "systemChromeMaterial" tint, which automatically adapts to the
 * system's theme (light or dark mode). The intensity of the blur is set to 100,
 * which is the highest level of blur supported on iOS.
 *
 * The blur view is styled with `StyleSheet.absoluteFill`, so it will take up the
 * full size of its parent container.
 */
export default function BlurTabBarBackground() {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
