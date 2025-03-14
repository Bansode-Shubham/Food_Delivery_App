// import { FontAwesome } from "@expo/vector-icons";
// import { Stack, Link, useRouter } from "expo-router";
// import { Pressable } from "react-native";

// export default function MenuStack() {
//   const router = useRouter();
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ title: "Menu" }} />
//     </Stack>
//   );
// }


// import { Stack } from "expo-router";

// export default function AppLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ title: "Restaurants" }} />
//       <Stack.Screen name="[id]" options={{ title: "Menu" }} />
//       <Stack.Screen name="[id]/[product]" options={{ title: "Product Details" }} />
//     </Stack>
//   );
// }


import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Select Restaurant" }} />
      <Stack.Screen name="[id]" options={{ title: "Menu" }} />
      <Stack.Screen name="[id]/[product]" options={{ title: "Product Details" }} />
    </Stack>
  );
}
