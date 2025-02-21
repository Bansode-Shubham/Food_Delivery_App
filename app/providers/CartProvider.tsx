import { CartItem , Product } from "@/assets/types";
import { createContext, useContext } from "react";
import { PropsWithChildren ,useState } from "react";
import { randomUUID} from "expo-crypto";

type CartType = {
    items: CartItem[],
    addItem: (product:Product,size:CartItem['size']) => void;
    updateQuantity: (id: string, quantity: -1|1) => void;
}

export const CartContext = createContext<CartType>({
    items:  [],
    addItem: () => {},
    updateQuantity: () => {},
});


const CartProvider = ({ children} : PropsWithChildren) => {
    const [items , setitems] = useState<CartItem[]>([]);



    const addItem = (product:Product,size:CartItem['size']) => {
        const existingItem = items.find((item) => item.product_id === product.id && item.size === size);
        if(existingItem){   
            updateQuantity(existingItem.id, 1);
            return;
        }


        console.log(product);
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };
        setitems([newCartItem, ...items]);

    };

    const updateQuantity = (id: string, quantity: -1|1 ) => {
      const updatedItems = items.map((item) => {
            if(item.id === id){
                return {...item, quantity: item.quantity + quantity};
            }
            return item;
        }).filter((item) => item.quantity > 0);
        setitems(updatedItems);
        
    };


    return (
        <CartContext.Provider value={{ items, addItem,updateQuantity}}>
        {children}
        </CartContext.Provider>
    );

};



export default CartProvider;

export const useCart = () => useContext(CartContext);