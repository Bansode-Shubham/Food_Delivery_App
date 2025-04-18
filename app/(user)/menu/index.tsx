import { FlatList, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/superbase";

export default function RestaurantScreen() {
  const router = useRouter();

  const {
    data: restaurants,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase.from("restaurants").select("*");

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
          onPress={() => {
            router.push(`/menu/${item.id}`);
          }}
          style={{
            backgroundColor: "#f5f5f5",
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
