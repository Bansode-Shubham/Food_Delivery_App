import { FontAwesome } from "@expo/vector-icons";
import { Stack, Link, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function OrdersStack() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Order" }} />
      <Stack.Screen name="list" options={{ headerShown:false }} />
    </Stack>
  );
}
