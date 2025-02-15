import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A custom tab bar button component that provides haptic feedback on iOS devices.
 *
 * @param props - BottomTabBarButtonProps passed down to the component.
 *
 * The component uses `PlatformPressable` to handle press interactions.
 * When pressed on iOS, it triggers a light haptic impact feedback.
 */

/******  28afea78-d8ac-48c8-95c3-c1904b5f03d0  *******/
export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
