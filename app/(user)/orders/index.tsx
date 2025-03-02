import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native";
import orders from "@/assets/orders";
import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";

export default function OrdersScreen() {
    return (
        <SafeAreaView>
        <FlatList
          data={orders}
            renderItem={({ item }) => <OrderListItem orderItem={item} />}
            
        />
        </SafeAreaView>
    );
    }