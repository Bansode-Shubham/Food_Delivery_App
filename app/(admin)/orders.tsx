import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";

/**
 * TabTwoScreen component renders an "Explore" screen using a ParallaxScrollView.
 * It features a customizable header icon and a series of Collapsible sections
 * that provide information on various topics, including file-based routing,
 * platform support, image handling, custom fonts, theme support, and animations.
 * Each section contains informative text and external links for further learning.
 */

export default function Orders() {

  return (
    <SafeAreaView>
      <Text style={styles.titleContainer}>Hello World! </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    
  },
  titleContainer: {
    
  },
});
