"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "./catalog";
import { products } from "./catalog";

export type CartItem = { product: Product; size: string; color: string; quantity: number };
type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  setOpen: (open: boolean) => void;
  addItem: (product: Product, size: string, color: string) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("aamira-basic-cart");
        if (saved) {
          const storedItems = JSON.parse(saved) as CartItem[];
          setItems(storedItems.flatMap((item) => {
            const currentProduct = products.find((product) => product.id === item.product.id);
            return currentProduct ? [{ ...item, product: currentProduct }] : [];
          }));
        }
      } catch { /* Ignore invalid local cart data. */ }
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem("aamira-basic-cart", JSON.stringify(items));
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    isOpen,
    setOpen,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addItem(product, size, color) {
      const selectedVariant = product.variants.find(
        (variant) => variant.size === size && variant.color === color
      );
      if (!selectedVariant || selectedVariant.stock < 1) return;
      setItems((current) => {
        const index = current.findIndex((item) => item.product.id === product.id && item.size === size && item.color === color);
        if (index < 0) return [...current, { product, size, color, quantity: 1 }];
        return current.map((item, itemIndex) => itemIndex === index ? { ...item, quantity: Math.min(item.quantity + 1, selectedVariant.stock) } : item);
      });
      setOpen(true);
    },
    updateQuantity(index, quantity) {
      setItems((current) => current.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        const variant = item.product.variants.find(
          (candidate) => candidate.size === item.size && candidate.color === item.color
        );
        return { ...item, quantity: Math.min(Math.max(1, quantity), variant?.stock ?? 1) };
      }));
    },
    removeItem(index) { setItems((current) => current.filter((_, itemIndex) => itemIndex !== index)); },
    clear() { setItems([]); },
  }), [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
