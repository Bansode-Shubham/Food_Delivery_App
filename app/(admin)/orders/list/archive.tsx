import { FlatList } from 'react-native';
import orders from '../../../../assets/orders';
import OrderListItem from '../../../../components/OrderListItem';
import { Stack } from 'expo-router';

export default function ArchiveScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Archive' }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem orderItem={item} />}
      />
    </>
  );
}