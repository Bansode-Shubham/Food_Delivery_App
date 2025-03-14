import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/lib/superbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAdminOrderList = ({archived = false}) => {
    const status = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];
    return useQuery({
        queryKey: ['orders',{archived}],
        queryFn: async () => {
            const { data, error } = await supabase
            .from('orders')
            .select('*')
            .in('status', status)
            .order('created_at',{ascending:false});
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}




export const useMyOrderList = () => {
    const {session} =useAuth();
    const userId = session?.user.id;
   
    return useQuery({
        queryKey: ['orders',{userId : userId}],
        queryFn: async () => {
            const { data, error } = await supabase.
            from('orders')
            .select('*')
            .eq('user_id',userId)
            .order('created_at',{ascending:false});
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
}



export const useOrderDetails = (id: number) => {
    return useQuery({
      queryKey: ['order', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, products(*))')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };



export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: newOrder } = await supabase
            .from('orders')
            .insert({
                total: data.total,
                user_id: userId,
            })
            .select()
            .single();
            if (error) {
                throw new Error(error.message);
            }
            return newOrder;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn({ id, status }: any) {
        const { data, error } = await supabase
          .from('orders')
          .update({ status })
          .eq('id', id)
          .select();
  
        if (error) {
          throw error;
        }
        return data;
      },
      async onSuccess(_, { id }) {
        await queryClient.invalidateQueries({ queryKey: ['orders'] });
        await queryClient.invalidateQueries({ queryKey: ['order', id] });
      },
      onError(error) {
        console.log(error);
      },
    });
  };



//   export const useInsertOrder = () => {
//     const queryClient = useQueryClient();
//     const { user } = useAuth();
  
//     return useMutation({
//       async mutationFn({ total }: any) {
//         if (!user) return null;
  
//         const { error, data } = await supabase
//           .from('orders')
//           .insert({
//             total,
//             user_id: user.id,
//           })
//           .select();
  
//         if (error) {
//           throw error;
//         }
//         return data[0];
//       },
//       async onSuccess() {
//         await queryClient.invalidateQueries(['orders']);
//       },
//       onError(error) {
//         console.log(error);
//       },
//     });
//   };