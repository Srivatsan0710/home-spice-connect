
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  dishName: string;
  cookName: string;
  price: number;
  image: string;
  quantity: number;
  instructions?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (dishName: string) => void;
  updateQuantity: (dishName: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.dishName === newItem.dishName);
      if (existingItem) {
        return prevItems.map(item =>
          item.dishName === newItem.dishName
            ? { ...item, quantity: item.quantity + 1, instructions: newItem.instructions }
            : item
        );
      }
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (dishName: string) => {
    setItems(prevItems => prevItems.filter(item => item.dishName !== dishName));
  };

  const updateQuantity = (dishName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishName);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.dishName === dishName ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
