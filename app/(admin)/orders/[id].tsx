import React from "react";
import { View, FlatList, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { ThemedText } from "../../../components/ThemedText";
import OrderListItem from "../../../components/OrderListItem";
import OrderItemListItem from "../../../components/OrderItemListItem";
import orders from "../../../assets/orders"; // Adjust the import path as needed
import { OrderStatus, OrderStatusList } from "@/assets/types";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useOrderDetails, useUpdateOrder } from "@/app/api/orders";

const OrderDetailScreen = () => {
  const { id:idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { mutate: updateOrder } = useUpdateOrder();
  const{data:order,isLoading,error} = useOrderDetails(id);
  if(isLoading){
    return <ActivityIndicator />;
  }
  if(error){
    return <ThemedText>{error.message}</ThemedText>;
  }

  const updateStatus = async (status: OrderStatus) => {
    updateOrder({ id, status: status });
  };
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem orderItem={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => (
          <>
            <ThemedText style={{ fontWeight: "bold" }}>Status</ThemedText>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: "white",
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? "green"
                        : "transparent",
                  }}
                >
                  <ThemedText
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                   <ThemedText>{status}</ThemedText> 
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
