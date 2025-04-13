import { supabase } from "@/lib/superbase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

/**
 * A custom hook that subscribes to real-time order insertions in the database.
 * Listens to INSERT events on the 'orders' table and invalidates the orders query cache when new orders are added.
 * 
 * Uses Supabase's real-time subscription feature to monitor database changes.
 * When a new order is inserted, it triggers a re-fetch of orders data by invalidating the query cache.
 * 
 * @returns void
 * @example
 * ```tsx
 * function OrderComponent() {
 *   useInsertOrderSubscription();
 *   // ... rest of the component
 * }
 * ```
 */
export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
      )
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);
};

/**
 * Hook that subscribes to real-time updates for a specific order in Supabase.
 * When the order is updated, it invalidates the related query cache.
 * 
 * @param id - The unique identifier of the order to subscribe to
 * @returns void
 * 
 * @example
 * ```typescript
 * useUpdateOrderSubscription(123);
 * ```
 */
export const useUpdateOrderSubscription = (id: number) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["orders", id] });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
