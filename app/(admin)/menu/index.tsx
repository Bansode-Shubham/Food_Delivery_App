// import { FlatList, ActivityIndicator } from "react-native";

// import { ThemedText } from "@/components/ThemedText";

// import React from "react";

// import { SafeAreaView } from "react-native-safe-area-context";

// import ProductListItem from "@/components/ProductList";
// import { useProductList } from "@/app/api/product";

// export default function MenuScreen() {
  
//   const { data: products, error, isLoading } = useProductList(1);
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




import { FlatList, ActivityIndicator, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AdminProductListItem from "@/components/AdminProductList";
import { useProductList } from "@/app/api/product";
import { useRestaurantByOwner } from "@/app/api/product"; // Import the new hook

export default function MenuScreen() {
  // First, get the restaurant owned by the current user
  const { 
    data: restaurant, 
    error: restaurantError, 
    isLoading: isLoadingRestaurant 
  } = useRestaurantByOwner();
  
  // Then, use the restaurant ID to fetch products
  const { 
    data: products, 
    error: productsError, 
    isLoading: isLoadingProducts 
  } = useProductList(restaurant?.id);
  
  // Handle loading states
  if (isLoadingRestaurant || isLoadingProducts) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  
  // Handle errors
  if (restaurantError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Error loading restaurant: {restaurantError.message}</ThemedText>
      </SafeAreaView>
    );
  }
  
  if (!restaurant) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>No restaurant found for your account.</ThemedText>
        <ThemedText>Please contact support if you believe this is an error.</ThemedText>
      </SafeAreaView>
    );
  }
  
  if (productsError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Error loading menu items: {productsError.message}</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <ThemedText style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {restaurant.name} Menu
        </ThemedText>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <AdminProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ThemedText>No menu items found. Add your first item!</ThemedText>
          </View>
        }
      />
    </SafeAreaView>
  );
}