import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order } from "../assets/types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";

dayjs.extend(relativeTime);

type OrderItemListItemProps = {
  orderItem: Order;
};

const OrderListItem = ({ orderItem }: OrderItemListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/orders/${orderItem.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{orderItem.id}</Text>
          <Text style={styles.time}>
            {dayjs(orderItem.created_at).fromNow()}
          </Text>
        </View>

        <Text style={styles.status}>{orderItem.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  time: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
  },
});

export default OrderListItem;
