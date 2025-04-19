import { CartItem, Product } from "@/assets/types";
import { createContext, useContext } from "react";
import { PropsWithChildren, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";


// after
type CartType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (id: string, quantity: -1 | 1) => void;
  total: number;
  checkout: (address?: string) => void;    // <-- allow an optional address
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: (_address?: string) => {},   // <-- accept an optional param
});

/**
 * CartProvider component that manages the shopping cart state and operations.
 * 
 * @component
 * @param {PropsWithChildren} props - The component props containing children elements
 * 
 * @returns {JSX.Element} CartContext.Provider wrapping the children components
 * 
 * @remarks
 * This provider component includes the following cart management functions:
 * - addItem: Adds a product to the cart or increments its quantity if already exists
 * - updateQuantity: Updates the quantity of a specific item in the cart
 * - total: Calculates the total price of all items in the cart
 * - clearcart: Removes all items from the cart
 * - saveOrderItems: Saves order items to the database after order creation
 * - checkout: Processes the checkout by creating an order and saving order items
 * 
 * The cart state is managed using React's useState hook and includes:
 * - items: Array of CartItem objects
 * - total: Calculated total price of all items
 * 
 * @example
 * ```tsx
 * <CartProvider>
 *   <App />
 * </CartProvider>
 * ```
 */
const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setitems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { mutate: insert } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  
  const addItem = (product: Product) => {
    console.log('Adding item to cart:', product);
    const existingItem = items.find((item) => item.product_id === product.id);
    if (existingItem) {
      console.log('Item already exists, updating quantity');
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      quantity: 1,
    };
    console.log('Created new cart item:', newCartItem);
    setitems([newCartItem, ...items]);
  };

  const updateQuantity = (id: string, quantity: -1 | 1) => {
    console.log('Updating quantity for item:', id, 'by:', quantity);
    const updatedItems = items
      .map((item) => {
        if (item.id === id) {
          console.log('Found item to update:', item);
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    console.log('Updated items:', updatedItems);
    setitems(updatedItems);
  };

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const saveOrderItems = (newOrder: any) => {
    console.log('Saving order items for order:', newOrder);
    if (!newOrder) {
      console.log('No order provided, aborting');
      return;
    }

    insertOrderItems(
      {
        items,
        order_id: newOrder.id,
      },
      {
        onSuccess() {
          console.log('Order items saved successfully');
          setitems([]);
          router.push(`/(user)/orders/${newOrder.id}`);
        },
      }
    );
  };

  const checkout = (address?: string) => {
    console.log('Starting checkout process');
    if (items.length === 0) {
      console.log('Cart is empty, aborting checkout');
      return;
    }

    if (!address?.trim()) {
      console.warn('Checkout called without an address');
      return;
    }

    const restaurant_id = items[0].product.restaurant_id;
    console.log('Processing order:', { total, restaurant_id, address });
    
    insert(
      { total, restaurant_id, address },
      { 
        onSuccess: (data) => {
          console.log('Order inserted successfully:', data);
          saveOrderItems(data);
        }
      }
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
