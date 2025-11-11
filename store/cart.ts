import { create } from "zustand";
import { persist } from "zustand/middleware";

export  interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  sku:string;
  stock:number;
  image:string;
}

interface CartStore {
  items: CartItem[];
  addItem(item:Omit<CartItem, "id">) : void;
  removeItem(productId: string): void;
  updateItemQuantity(productId: string, quantity: number): void;
  clearCart(): void;
  getTotalPrice(): number;
  getTotalItems(): number;
  isInCart(productId: string): boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items:[],
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === newItem.productId);
          if (existingItem) {
            const newQuantity = existingItem.quantity + newItem.quantity;
            if(newQuantity > existingItem.stock) {
              return state;
            }
            return {
              items:state.items.map((item) => item.productId === newItem.productId ? {...item, quantity: newQuantity} : item),
            };
          } else {
            if (newItem.quantity > newItem.stock) {
              return state;
            }
            return {
              // items:[...state.items,{...newItem, id: crypto.randomUUID()}]
              items:[
                ...state.items,
                {
                  ...newItem,
                  id: `${newItem.productId} - 
                  ${Date.now()}`,
                },
              ],
            };
          }
        });
      },
      removeItem: (productId) => {
        set ((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },
      updateItemQuantity: (productId,quantity) =>{
        if(quantity <= 0) {
          get().removeItem(productId);
        }
        set((state) =>{
          const item = state.items.find((item) =>item.productId === productId);
          if(!item) return state;
          if (quantity > item.stock) return state;
          return {
            items:state.items.map((item) =>item.productId === productId ? {...item, quantity} : item),
          };
        });
      },
      clearCart: () => {
        set({items: []});
      },
      getTotalItems: () => {
        return get ().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      isInCart: (productId) => {
        return get().items.some((item) => item.productId === productId);
      },
    }),
    {
      name: "cart-storage",
      migrate: (persistedState:any, version: number) => {
        return {items: []};
      },
    }
  )
);