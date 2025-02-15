/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

/**
 * A hook that returns a color based on the current theme and the given color name.
 * If the given color name exists in the `props` object, it will be returned.
 * Otherwise, the color from the `Colors` object will be returned.
 *
 * @param props An object with optional `light` and `dark` properties.
 * The values of these properties should be the colors that should be used
 * for the respective theme.
 * @param colorName The name of the color that should be returned.
 * This should be a key in the `Colors.light` and `Colors.dark` objects.
 * @returns The color that should be used for the given theme and color name.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
