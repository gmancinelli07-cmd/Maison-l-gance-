import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CatalogView from './components/CatalogView';
import CartView from './components/CartView';
import Footer from './components/Footer';
import { Product, CartItem } from './types';
import { INITIAL_CART_ITEMS } from './constants';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<'catalog' | 'cart'>('catalog');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: 'Original', selectedSize: 'OS' }];
    });
    setActiveView('cart');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      <Navbar 
        activeView={activeView}
        cartCount={cartCount} 
        onCartClick={() => setActiveView('cart')}
        onLogoClick={() => setActiveView('catalog')}
      />

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {activeView === 'catalog' ? (
            <div key="catalog">
              <CatalogView onAddToCart={addToCart} />
            </div>
          ) : (
            <div key="cart">
              <CartView 
                items={cartItems} 
                onUpdateQuantity={updateQuantity} 
                onRemoveItem={removeItem} 
              />
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
