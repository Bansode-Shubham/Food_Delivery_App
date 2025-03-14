import { ActivityIndicator, FlatList } from 'react-native';

import OrderListItem from '../../../../components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/app/api/orders';
import { ThemedText } from '@/components/ThemedText';

export default function ArchiveScreen() {
    const { data: orders, isLoading, error } = useAdminOrderList({ archived: true });
    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return <ThemedText>{error.message}</ThemedText>;
    }
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