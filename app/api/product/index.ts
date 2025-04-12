import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/superbase";
import { useAuth } from "@/app/providers/AuthProvider";

/**
 * Custom hook to fetch products for a specific restaurant from Supabase.
 * 
 * @param restaurantId - The unique identifier of the restaurant
 * @returns A query result object containing:
 *  - data: Array of products if the query is successful
 *  - error: Error object if the query fails
 *  - status: Current status of the query ('loading', 'error', 'success')
 *  - isFetching: Boolean indicating if the query is currently fetching data
 * @throws Error if Supabase returns an error during the query
 */
export const useProductList = (restaurantId: number) => {
  return useQuery({
    queryKey: ["products", restaurantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("restaurant_id", restaurantId); // ✅ Filter by restaurant
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// Fetch restaurant owned by the logged-in user
/**
 * Custom hook that fetches restaurant data for the authenticated restaurant owner.
 * 
 * @returns A query result object containing:
 * - data: Restaurant data for the authenticated owner
 * - isLoading: Boolean indicating if the query is loading
 * - error: Any error that occurred during the query
 * - and other react-query result properties
 * 
 * @throws Error if user is not authenticated
 * @throws Error if database query fails
 * 
 * @remarks
 * - Uses React Query for data fetching and caching
 * - Only runs when user profile is loaded and authentication is not in progress
 * - Assumes one restaurant per owner using .single() in the query
 */
export const useRestaurantByOwner = () => {
  const { profile, loading: authLoading } = useAuth(); // Use your existing auth context

  return useQuery({
    queryKey: ["restaurant", profile?.id],
    queryFn: async () => {
      if (!profile?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", profile.id)
        .single(); // Assuming one restaurant per owner

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: !!profile?.id && !authLoading, // Only run when profile is loaded and not loading
  });
};

/**
 * Custom hook to fetch a single product by ID from Supabase database.
 * 
 * @param id - The unique identifier of the product to fetch
 * @returns A query result object containing the product data and status
 * @throws Error if the Supabase query fails
 * 
 * @example
 * ```typescript
 * const { data, isLoading, error } = useProduct(123);
 * ```
 */
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

/**
 * Custom hook to fetch all restaurants from the database.
 * Uses React Query to manage server state and caching.
 * 
 * @returns {UseQueryResult} A query result object containing:
 * - data: Array of restaurant records if successful
 * - error: Error object if the query fails
 * - isLoading: Boolean indicating if the query is in progress
 * - and other React Query state properties
 * 
 * @throws {Error} If there's an error fetching data from Supabase
 */
export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase.from("restaurants").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};


/**
 * Custom hook for inserting a new product into the database.
 * Automatically associates the product with the authenticated user's restaurant.
 * 
 * @returns A mutation object that handles the product insertion
 * 
 * @example
 * ```tsx
 * const { mutate } = useInsertProduct();
 * 
 * const addProduct = () => {
 *   mutate({
 *     name: "New Product",
 *     price: 9.99,
 *     image: "image-url"
 *   });
 * };
 * ```
 * 
 * The mutation function accepts:
 * @param {Object} data - The product data
 * @param {string} data.name - The name of the product
 * @param {number} data.price - The price of the product
 * @param {string} data.image - The image URL of the product
 * 
 * @throws {Error} If restaurant ID is not found
 * @throws {Error} If database insertion fails
 */
export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  const { data: restaurant } = useRestaurantByOwner();

  return useMutation({
    async mutationFn(data: any) {
      if (!restaurant?.id) {
        throw new Error("Restaurant ID not found");
      }

      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          price: data.price,
          image: data.image,
          restaurant_id: restaurant.id // Automatically add restaurant_id
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

/**
 * Custom hook for updating a product in the Supabase database.
 * 
 * @returns A mutation object from react-query that handles the product update operation
 * 
 * @example
 * ```tsx
 * const { mutate, isLoading } = useUpdateProduct();
 * 
 * const updateProduct = () => {
 *   mutate({ 
 *     id: 1,
 *     name: "New name",
 *     price: 99.99,
 *     image: "image-url"
 *   });
 * };
 * ```
 * 
 * The mutation function accepts an object with:
 * @param {Object} data - The product data to update
 * @param {number} data.id - The ID of the product to update
 * @param {string} data.name - The new name of the product
 * @param {number} data.price - The new price of the product
 * @param {string} data.image - The new image URL of the product
 * 
 * On successful update:
 * - Invalidates the "products" query cache
 * - Invalidates the specific product query cache
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          price: data.price,
          image: data.image,
        })
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};

/**
 * Custom hook for deleting a product from the database.
 * Uses React Query's useMutation to handle the deletion operation.
 * 
 * @returns {UseMutationResult} A mutation object that includes:
 * - mutate: Function to trigger the deletion
 * - isLoading: Boolean indicating if deletion is in progress
 * - isError: Boolean indicating if an error occurred
 * - isSuccess: Boolean indicating if deletion was successful
 * 
 * @example
 * ```typescript
 * const deleteProduct = useDeleteProduct();
 * deleteProduct.mutate(productId);
 * ```
 * 
 * @throws Will throw an error if the database operation fails
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
