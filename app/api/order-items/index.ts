import { useAuth } from "@/app/providers/AuthProvider";
import { CartItem } from "@/assets/types";
import { supabase } from "@/lib/superbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook that creates a mutation for inserting order items into the database
 * 
 * @returns A mutation object for inserting order items
 * 
 * @example
 * const insertOrderItems = useInsertOrderItems();
 * insertOrderItems.mutate({
 *   items: cartItems,
 *   order_id: orderId
 * });
 * 
 * @remarks
 * This hook uses Supabase to insert multiple order items in a single transaction.
 * Each item is mapped to include quantity, order_id, and product_id.
 * 
 * @throws Will throw an error if the Supabase insertion fails
 */
export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn({
      items,
      order_id,
    }: {
      items: CartItem[];
      order_id: number;
    }) {
      const { error } = await supabase.from("order_items").insert(
        items.map((item) => ({
          quantity: item.quantity,
          order_id: order_id,
          product_id: item.product_id,
        }))
      );

      if (error) {
        throw error;
      }
    },
    onError(error) {
      console.log(error);
    },
  });
};

