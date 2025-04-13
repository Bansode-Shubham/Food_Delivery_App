import { useAuth } from "@/app/providers/AuthProvider";
import { supabase } from "@/lib/superbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


/**
 * Custom hook to fetch orders list for admin based on archived status
 * 
 * @param options - Object containing query parameters
 * @param options.archived - Boolean flag to determine if archived orders should be fetched
 *                         true: fetches 'Delivered' orders
 *                         false: fetches orders with status 'New', 'Cooking', or 'Delivering'
 * @returns Query object containing orders data, loading state, and error if any
 * 
 * @example
 * ```typescript
 * const { data, isLoading, error } = useAdminOrderList({ archived: false });
 * ```
 */
// export const useAdminOrderList = ({archived = false}) => {
//     const status = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];
//     return useQuery({
//         queryKey: ['orders',{archived}],
//         queryFn: async () => {
//             const { data, error } = await supabase
//             .from('orders')
//             .select('*')
//             .in('status', status)
//             .order('created_at',{ascending:false});
//             if (error) {
//                 throw new Error(error.message);
//             }
//             return data;
//         },
//     });
// }


export const useAdminOrderList = ({ archived = false }) => {
  const { session } = useAuth();
  const userId = session?.user.id;
  const status = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];

  return useQuery({
    queryKey: ['orders', { archived }],
    queryFn: async () => {
      // Fetch the restaurant id owned by the admin
      const { data: restaurant, error: restaurantError } = await supabase
        .from('restaurants')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (restaurantError) throw new Error(restaurantError.message);

      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('restaurant_id', restaurant.id)
        .in('status', status)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);

      return data;
    },
  });
};


/**
 * Custom hook to fetch and manage the list of orders for the authenticated user.
 * 
 * @returns A React Query result object containing:
 *  - data: Array of order objects from the database
 *  - error: Error object if the query fails
 *  - status: Current status of the query ('loading', 'error', 'success')
 *  - other React Query properties
 * 
 * @throws Error if there's a problem fetching data from Supabase
 * 
 * @example
 * ```tsx
 * const { data: orders, isLoading } = useMyOrderList();
 * ```
 */
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



/**
 * Custom hook to fetch order details with associated order items and products from Supabase.
 * @param id - The order ID to fetch details for
 * @returns A query result object containing the order details, loading state, and error state
 * @throws Error if the Supabase query fails
 * @example
 * ```tsx
 * const { data, isLoading, error } = useOrderDetails(123);
 * ```
 */
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



/**
 * Custom hook for inserting a new order into the database.
 * Uses React Query's useMutation hook for handling the mutation state and side effects.
 * 
 * @returns {UseMutationResult} A mutation object containing the mutation function and state
 * @throws {Error} If there's an error during the database insertion
 * 
 * @example
 * const { mutate } = useInsertOrder();
 * mutate({ total: 100 });
 */
interface OrderData {
    total: number;
    restaurant_id: number;
}

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;

    return useMutation({
        async mutationFn(data: OrderData) {
            const { error, data: newOrder } = await supabase
            .from('orders')
            .insert({
                total: data.total,
                user_id: userId,
                restaurant_id: data.restaurant_id,
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

/**
 * Custom hook for updating an order's status in the database.
 * 
 * @returns A mutation object with methods to update an order
 * 
 * The mutation accepts an object with:
 * @param {object} params - The parameters object
 * @param {string|number} params.id - The ID of the order to update
 * @param {string} params.status - The new status to set for the order
 * 
 * @throws Will throw an error if the database update fails
 * 
 * On successful mutation:
 * - Invalidates the 'orders' query cache
 * - Invalidates the specific order query cache
 * - Returns the updated order data
 * 
 * On error:
 * - Logs the error to console
 */
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


