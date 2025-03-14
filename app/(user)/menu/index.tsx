
// import { FlatList } from "react-native";

// import { ThemedText } from "@/components/ThemedText";

// // Define the Product type
// type Product = {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
// };
// import React from "react";

// import { SafeAreaView } from "react-native-safe-area-context";

// import ProductListItem from "@/components/ProductList";
// import { useProductList } from "@/app/api/product";
// import { ActivityIndicator } from "react-native-paper";

// export default function MenuScreen() {
//   const { data: products, error, isLoading } = useProductList();
//   if (isLoading) {
//     return <ActivityIndicator />;
//   }
//   if (error) {
//     return <ThemedText>{error.message}</ThemedText>;
//   }

//   return (
//     <>
//       <SafeAreaView>
//         <FlatList
//           data={products}
//           renderItem={({ item }) => <ProductListItem product={item} />}
//           numColumns={2}
//           contentContainerStyle={{ gap: 10, padding: 10 }}
//           columnWrapperStyle={{ gap: 10 }}
//         />
//       </SafeAreaView>
//     </>
//   );
// }


// import React from "react";
// import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRestaurants } from "@/app/api/product"; // New hook to fetch restaurants
// import { ActivityIndicator } from "react-native-paper";
// import { useRouter } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";

// export default function RestaurantScreen() {
//   const router = useRouter();
//   const { data: restaurants, error, isLoading } = useRestaurants();

//   if (isLoading) {
//     return <ActivityIndicator />;
//   }

//   if (error) {
//     return <Text>Error: {error.message}</Text>;
//   }

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={restaurants}
//         renderItem={({ item }) => (
//           <Pressable
//             style={styles.restaurantContainer}
//             onPress={() => router.push(`/menu/${item.id}`)} // Navigate to menu
//           >
//             <ThemedText style={styles.restaurantName}>{item.name}</ThemedText>
//             <ThemedText style={styles.cuisineType}>Cuisine: {item.cuisine_type}</ThemedText>
//           </Pressable>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ gap: 10, padding: 10 }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   restaurantContainer: {
//     backgroundColor: "#f5f5f5",
//     padding: 15,
//     borderRadius: 10,
//   },
//   restaurantName: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   cuisineType: {
//     color: "#666",
//     fontSize: 16,
//   },
// });


// import React from "react";
// import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRestaurants } from "@/app/api/product";
// import { ActivityIndicator } from "react-native-paper";
// import { useRouter } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";

// export default function RestaurantScreen() {
//   const router = useRouter();
//   const { data: restaurants, error, isLoading } = useRestaurants();

//   if (isLoading) {
//     return <ActivityIndicator />;
//   }

//   if (error) {
//     return <Text>Error: {error.message}</Text>;
//   }

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={restaurants}
//         renderItem={({ item }) => (
//           <Pressable
//             style={styles.restaurantContainer}
//             onPress={() => router.push(`/menu/${item.id}`)} // Navigate to menu
//           >
//             <ThemedText style={styles.restaurantName}>{item.name}</ThemedText>
//             <ThemedText style={styles.cuisineType}>Cuisine: {item.cuisine_type}</ThemedText>
//           </Pressable>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={{ gap: 10, padding: 10 }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   restaurantContainer: {
//     backgroundColor: "#f5f5f5",
//     padding: 15,
//     borderRadius: 10,
//   },
//   restaurantName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color:"black"
//   },
//   cuisineType: {
//     color: "#666",
//     fontSize: 16,
//   },
// });


// import { FlatList, Pressable, Text, View } from "react-native";
// import { useRouter } from "expo-router";
// import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/superbase";

// export default function RestaurantScreen() {
//   const router = useRouter();

//   const { data: restaurants, error, isLoading } = useQuery({
//     queryKey: ['restaurants'],
//     queryFn: async () => {
//       const { data, error } = await supabase.from('restaurants').select('*');
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     },
//   });

//   if (isLoading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error: {error.message}</Text>;

//   return (
//     <FlatList
//       data={restaurants}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => (
//         <Pressable
//           onPress={() => router.push(`/menu?restaurantId=${item.id}`)} // ✅ Pass restaurantId
//           style={{
//             backgroundColor: '#f5f5f5',
//             padding: 10,
//             marginVertical: 5,
//             borderRadius: 8,
//           }}
//         >
//           <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
//           <Text style={{ color: "#666" }}>{item.cuisine_type}</Text>
//         </Pressable>
//       )}
//     />
//   );
// }


import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/superbase";

export default function RestaurantScreen() {
  const router = useRouter();

  const { data: restaurants, error, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data, error } = await supabase.from('restaurants').select('*');
      
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
        
          // onPress={() => router.push(`/menu/${item.id}`)} // ✅ Navigate to MenuScreen
          onPress={() => {
            console.log("Navigating to Restaurant ID:", item.id); // 🟠 Debug Log
            router.push(`/menu/${item.id}`);
          }}
          
          style={{
            backgroundColor: '#f5f5f5',
            padding: 10,
            marginVertical: 5,
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ color: "#666" }}>{item.cuisine_type}</Text>
        </Pressable>
      )}
    />
  );
}
