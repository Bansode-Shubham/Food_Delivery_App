// import { View, Text , FlatList, SafeAreaView} from "react-native";
// import { ThemedText } from "../../components/ThemedText";
// import Button from "@/components/Button_react_paper";

// import {  useCart } from "../providers/CartProvider";
// import CartListItem from "@/components/CartListItem";
// import React from "react";


// const CartScreen = () => {
//   const { items ,total, checkout } = useCart();
//   return (
//     <SafeAreaView>
   
//     <View style={{padding:30}}>
//     <ThemedText>Cart Screen</ThemedText>

//       <FlatList 
//       contentContainerStyle={{padding:10, gap:10}}
//        data={items} renderItem={({item}) => <CartListItem cartItem={item} />} />
//       <ThemedText>Total: Rs{total.toFixed(2)}</ThemedText>
//       <Button onPress={checkout} text="Checkout" />
//     </View>
//     </SafeAreaView>
//   );
// };

// export default CartScreen;


// import { View, Text, FlatList, SafeAreaView, TextInput, Alert } from "react-native";
// import { ThemedText } from "../../components/ThemedText";
// import Button from "@/components/Button_react_paper";
// import { useCart } from "../providers/CartProvider";
// import CartListItem from "@/components/CartListItem";
// import React, { useEffect, useState } from "react";
// import * as Location from "expo-location";

// const CartScreen = () => {
//   const { items, total, checkout } = useCart();
//   const [address, setAddress] = useState('');
//   const [locationLoading, setLocationLoading] = useState(false);

//   const getLocation = async () => {
//     try {
//       setLocationLoading(true);
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert("Permission Denied", "Location permission is required to auto-fill address.");
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({});
//       const coords = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       };

//       const geocode = await Location.reverseGeocodeAsync(coords);
//       const place = geocode[0];

//       if (place) {
//         const addr = `${place.name}, ${place.street}, ${place.city}, ${place.region}, ${place.postalCode}`;
//         setAddress(addr);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Failed to fetch location.");
//     } finally {
//       setLocationLoading(false);
//     }
//   };

//   const handleCheckout = () => {
//     if (!address) {
//       Alert.alert("Missing Address", "Please enter a delivery address before checkout.");
//       return;
//     }
//     checkout(); // pass address if needed
//   };

//   return (
//     <SafeAreaView>
//       <View style={{ padding: 30 }}>
//         <ThemedText>Cart Screen</ThemedText>

//         <FlatList
//           contentContainerStyle={{ padding: 10, gap: 10 }}
//           data={items}
//           renderItem={({ item }) => <CartListItem cartItem={item} />}
//         />

//         <TextInput
//           value={address}
//           onChangeText={setAddress}
//           placeholder="Enter delivery address"
//           style={{
//             borderWidth: 1,
//             borderColor: "#ccc",
//             padding: 10,
//             marginVertical: 10,
//             borderRadius: 8,
//           }}
//         />

//         <Button onPress={getLocation} text={locationLoading ? "Getting location..." : "Use Current Location"} />
//         <ThemedText>Total: Rs{total.toFixed(2)}</ThemedText>
//         <Button onPress={handleCheckout} text="Checkout" />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CartScreen;


import { View, Text, FlatList, SafeAreaView, TextInput, Alert } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import Button from "@/components/Button_react_paper";
import { useCart } from "../providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import React, { useState } from "react";
import * as Location from "expo-location";

const CartScreen = () => {
  const { items, total, checkout } = useCart();
  const [address, setAddress] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  const getLocation = async () => {
    try {
      console.log('Starting location fetch process...');
      setLocationLoading(true);
      
      console.log('Requesting location permissions...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        Alert.alert("Permission Denied", "Location permission is required to auto-fill address.");
        return;
      }

      console.log('Getting current position...');
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      console.log('Coordinates obtained:', coords);

      console.log('Reverse geocoding coordinates...');
      const geocode = await Location.reverseGeocodeAsync(coords);
      const place = geocode[0];
      if (place) {
        console.log('Address details:', place);
        const addr = `${place.name}, ${place.street}, ${place.city}, ${place.region}, ${place.postalCode}`;
        console.log('Formatted address:', addr);
        setAddress(addr);
      }
    } catch (error) {
      console.error('Location fetch error:', error);
      Alert.alert("Error", "Failed to fetch location.");
    } finally {
      console.log('Location fetch process completed');
      setLocationLoading(false);
    }
  };

  const handleCheckout = () => {
    console.log('Starting checkout process...');
    if (!address.trim()) {
      console.log('Checkout failed: No address provided');
      Alert.alert("Missing Address", "Please enter a delivery address before checkout.");
      return;
    }
    console.log('Processing checkout with address:', address);
    checkout(address);
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 30 }}>
        <ThemedText>Cart Screen</ThemedText>

        <FlatList
          contentContainerStyle={{ padding: 10, gap: 10 }}
          data={items}
          renderItem={({ item }) => {
            console.log('Rendering cart item:', item.id);
            return <CartListItem cartItem={item} />;
          }}
          keyExtractor={item => item.id}
        />

        <TextInput
          value={address}
          onChangeText={(text) => {
            console.log('Address input changed:', text);
            setAddress(text);
          }}
          placeholder="Enter delivery address"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginVertical: 10,
            borderRadius: 8,
          }}
        />

        <Button
          onPress={getLocation}
          text={locationLoading ? "Getting location..." : "Use Current Location"}
        />

        <ThemedText style={{ marginTop: 20 }}>
          Total: Rs{total.toFixed(2)}
        </ThemedText>

        <Button
          onPress={handleCheckout}
          text="Checkout"
          style={{ marginTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
