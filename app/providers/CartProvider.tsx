import { CartItem, Product } from "@/assets/types";
import { createContext, useContext } from "react";
import { PropsWithChildren, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";

type CartType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (id: string, quantity: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setitems] = useState<CartItem[]>([]);
  const router = useRouter();
  const { mutate: insert } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const addItem = (product: Product) => {
    const existingItem = items.find((item) => item.product_id === product.id);
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    console.log(product);
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      quantity: 1,
    };
    setitems([newCartItem, ...items]);
  };

  const updateQuantity = (id: string, quantity: -1 | 1) => {
    const updatedItems = items
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setitems(updatedItems);
  };

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const clearcart = () => {
    setitems([]);
  };

  const saveOrderItems = (newOrder: any) => {
    if (!newOrder) return;

    insertOrderItems(
      {
        items,
        order_id: newOrder.id,
      },
      {
        onSuccess() {
          setitems([]);
          router.push(`/(user)/orders/${newOrder.id}`);
          console.log("Order created successfully");
        },
      }
    );
  };

  const checkout = () => {
    insert(
      { total },
      {
        onSuccess: saveOrderItems,
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
