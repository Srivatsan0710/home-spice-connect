
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  dishName: string;
  cookName: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: string[];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (dishName: string) => void;
  updateQuantity: (dishName: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.dishName === newItem.dishName);
      if (existingItem) {
        return prev.map(item =>
          item.dishName === newItem.dishName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (dishName: string) => {
    setItems(prev => prev.filter(item => item.dishName !== dishName));
  };

  const updateQuantity = (dishName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishName);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.dishName === dishName ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getTotalItems,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
