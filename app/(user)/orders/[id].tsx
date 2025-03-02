// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { Stack, useLocalSearchParams } from 'expo-router';
// import orders from '../../../assets/orders'
// import OrderItemListItem from '../../../components/OrderItemListItem';
// import OrderListItem from '../../../components/OrderListItem';

// const OrderDetailScreen = () => {
//   const { id } = useLocalSearchParams();

//   const order = orders.find((o) => o.id.toString() === id);

//   if (!order) {
//     return <Text>Order not found!</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Stack.Screen options={{ title: `Order #${order.id}` }} />

//       <OrderListItem order={order} />

//       <FlatList
//         data={order.order_items}
//         renderItem={({ item }) => <OrderItemListItem item={item} />}
//         contentContainerStyle={{ gap: 10 }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     gap: 10,
//   },
// });

// export default OrderDetailScreen;


import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../../../components/ThemedText';
import OrderListItem from '../../../components/OrderListItem';
import OrderItemListItem from '../../../components/OrderItemListItem';
import orders from '../../../assets/orders'; // Adjust the import path as needed

const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return <ThemedText>Order not found!</ThemedText>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem orderItem={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;