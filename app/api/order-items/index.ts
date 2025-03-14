import { useAuth } from "@/app/providers/AuthProvider";
import { CartItem } from "@/assets/types";
import { supabase } from "@/lib/superbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useInsertOrderItems = () => {
    return useMutation({
      async mutationFn({
        items,
        order_id,
      }: {
        items: CartItem[];
        order_id: number;
      }) {
        const { error } = await supabase.from('order_items').insert(
          items.map((item) => ({
            size: item.size,
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

// export const useInsertOrderItems = () => {
//     const queryClient = useQueryClient();
    
    

//     return useMutation({
//         async mutationFn(data: any) {
//             const { error, data: newOrder } = await supabase
//             .from('orders_items')
//             .insert({
//                ...data,     
//             })
//             .select()
//             .single();
//             if (error) {
//                 throw new Error(error.message);
//             }
//             return newOrder;
//         },
//         async onSuccess() {
//             await queryClient.invalidateQueries({ queryKey: ['orders'] });
//         },
//     });
// };