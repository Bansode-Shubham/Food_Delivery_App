import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/superbase';


// export const useProductList = () => {
//   return useQuery({
//     queryKey: ['products'],
//     queryFn: async () => {
//       const { data, error } = await supabase.from('products').select('*');
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     },
//   });
// };

// export const useProductList = (restaurantId: number) => {
//   return useQuery({
//     queryKey: ['products', restaurantId],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('products')
//         .select('*')
//         .eq('restaurant_id', restaurantId); // Filter by restaurant
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     },
//   });
// };


// export const useProductList = (restaurantId: number) => {
//   return useQuery({
//     queryKey: ['products', restaurantId],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('products')
//         .select('*')
//         .eq('restaurant_id', restaurantId); // Filter by restaurant
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     },
//   });
// };


// 

export const useProductList = (restaurantId: number) => {
  return useQuery({
    queryKey: ['products', restaurantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', restaurantId); // ✅ Filter by restaurant
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};




export const useProduct = (id: number) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  };



   
export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data, error } = await supabase.from('restaurants').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


  export const useInsertProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      async mutationFn( data: any){
        const { error , data:newProduct } = await supabase.from('products').insert({
          name: data.name,
          price: data.price,
          image: data.image,
        });
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
     async onSuccess ()  {
        await queryClient.invalidateQueries({ queryKey: ['products'] });
      },

    })

  };


  export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data:any) {
        const { data:updatedProduct, error } = await supabase
          .from('products')
          .update({
            name: data.name,
            price: data.price,
            image: data.image,
          })
          .eq('id', data.id)
          .select()
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
        return updatedProduct;
      },
      async onSuccess(_, { id }) {
        await queryClient.invalidateQueries({ queryKey: ['products'] });
        await queryClient.invalidateQueries({ queryKey: ['product', id] });
       
      },
     
    });


  };


  export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(id: number) {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
  
        if (error) {
          throw new Error(error.message);
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
  };