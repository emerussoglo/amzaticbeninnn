"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { PRODUCTS_DATA } from "@/lib/catalog";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState<{
    productName: string;
  } | null>(null);

  useEffect(() => {
    if (!notification) return;
    const timeout = window.setTimeout(() => setNotification(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [notification]);

  // Charger le panier depuis le LocalStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem("espanadeal_cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as CartItem[];
        const currentIdByLegacyId = new Map<number, string>();
        PRODUCTS_DATA.forEach((product) => {
          if (product.legacyId !== undefined) {
            currentIdByLegacyId.set(product.legacyId, product.id);
          }
        });
        setCart(
          parsed.map((item) => ({
            ...item,
            id:
              typeof item.id === "number"
                ? (currentIdByLegacyId.get(item.id) ?? item.id)
                : item.id,
          })),
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Synchroniser le compteur et le LocalStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("espanadeal_cart", JSON.stringify(cart));
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCountAnimation(totalItems);
  }, [cart]);

  // Éviter les bugs d'hydratation Next.js pour le badge de la Navbar
  const setCountAnimation = (count: number) => {
    setCartCount(count);
  };

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setNotification({ productName: product.name });
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}
    >
      {children}
      {notification && (
        <div className="cart-notification" role="status" aria-live="polite">
          <span className="cart-notification-icon">
            <i className="fas fa-check" aria-hidden="true"></i>
          </span>
          <span className="cart-notification-copy">
            <strong>Ajouté au panier</strong>
            <span>{notification.productName}</span>
          </span>
          <a href="/panier" className="cart-notification-link">
            Voir le panier
          </a>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart doit être utilisé dans un CartProvider");
  return context;
}
