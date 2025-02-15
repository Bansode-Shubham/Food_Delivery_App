import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

/**
 * A `ScrollView` that renders a parallax header image.
 *
 * It renders a full-width `Image` at the top of the scroll view, and applies a
 * parallax effect to it. The image moves slower than the scroll view, creating
 * a parallax effect. The image will be scaled up to 2x when the scroll view is
 * at the top, and will be scaled down to 1x when the scroll view is at the
 * bottom.
 *
 * The component also renders a `ThemedView` with a background color that is
 * based on the `colorScheme` prop. The background color will be either the
 * light or dark theme color, depending on the `colorScheme` prop.
 *
 * The component also renders a `ThemedView` with a `content` style that has a
 * bottom padding equal to the `bottom` prop. This is used to ensure that the
 * content of the scroll view is not covered by the tab bar on iOS.
 *
 * @param {ReactElement} headerImage The image to be rendered in the header.
 * @param {{ dark: string; light: string }} headerBackgroundColor The background
 *     color of the header. It should be an object with `dark` and `light`
 *     properties, which are the colors for the dark and light themes,
 *     respectively.
 * @param {ReactNode} children The children to be rendered in the scroll view.
 */
export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
