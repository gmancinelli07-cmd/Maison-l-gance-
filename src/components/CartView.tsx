import { motion } from 'motion/react';
import { Minus, Plus, Truck, Package } from 'lucide-react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../constants';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartView({ items, onUpdateQuantity, onRemoveItem }: CartViewProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-[160px] pb-32 px-8 max-w-[1440px] mx-auto"
    >
      <header className="mb-16">
        <h1 className="text-5xl font-serif mb-6">Shopping Bag</h1>
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase font-bold tracking-widest-label text-gray-500">
            {items.length} ITEMS
          </span>
          <div className="h-[1px] flex-grow bg-gray-200" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Product List */}
        <div className="lg:col-span-8 space-y-16">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-10 pb-12 border-b border-gray-100 last:border-0 group">
                <div className="w-full md:w-[240px] aspect-[3/4] overflow-hidden bg-white">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between py-2">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest-label text-gray-400 mb-2">
                          {item.category}
                        </p>
                        <h2 className="text-2xl font-serif">{item.name}</h2>
                      </div>
                      <p className="text-2xl font-serif">€{item.price.toLocaleString()}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm flex items-center">
                        <span className="text-[9px] uppercase font-bold tracking-widest-label text-gray-400 w-20">Color</span>
                        {item.selectedColor || 'N/A'}
                      </p>
                      <p className="text-sm flex items-center">
                        <span className="text-[9px] uppercase font-bold tracking-widest-label text-gray-400 w-20">Size</span>
                        {item.selectedSize || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-12">
                    <div className="flex items-center border border-gray-200 divide-x divide-gray-200">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="px-6 py-2 text-sm font-medium min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[10px] uppercase font-bold tracking-widest-label border-b border-black pb-1 hover:opacity-50 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-t border-gray-100">
              <p className="text-gray-400 font-serif italic mb-8">Your bag is currently empty.</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-[10px] uppercase font-bold tracking-widest-label border-b border-black pb-1"
              >
                Back to Collection
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4 bg-white p-10 border border-gray-100 sticky top-[120px]">
          <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] mb-10 pb-6 border-b border-gray-50">Summary</h3>
          <div className="space-y-6 mb-10">
            <div className="flex justify-between text-sm text-gray-500 font-medium uppercase tracking-widest-label">
              <span>Subtotal</span>
              <span>€{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 font-medium uppercase tracking-widest-label">
              <span>Estimated Shipping</span>
              <span className="text-[10px]">Complimentary</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 font-medium uppercase tracking-widest-label">
              <span>Tax</span>
              <span>€0.00</span>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 mb-10">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-serif uppercase tracking-widest-label">Total</span>
              <span className="text-3xl font-serif">€{subtotal.toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full bg-black text-white py-6 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-gray-900 transition-colors mb-6">
            Proceed to Checkout
          </button>
          <p className="text-center text-[9px] uppercase tracking-widest text-gray-400 mb-12">
            Secure payment via Stripe & PayPal
          </p>

          <div className="space-y-8 pt-8 border-t border-gray-50">
            <div className="flex gap-4 items-start">
              <Truck size={18} strokeWidth={1} className="text-gray-400" />
              <div>
                <p className="text-[10px] uppercase font-extrabold tracking-widest-label mb-1">Express Shipping</p>
                <p className="text-[11px] text-gray-400 font-medium">Arrival within 2-4 business days.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Package size={18} strokeWidth={1} className="text-gray-400" />
              <div>
                <p className="text-[10px] uppercase font-extrabold tracking-widest-label mb-1">Eco-Conscious Packaging</p>
                <p className="text-[11px] text-gray-400 font-medium">Delivered in our signature plastic-free box.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Recommendations */}
      <section className="mt-40">
        <div className="flex justify-between items-baseline mb-16 border-b border-gray-100 pb-6">
          <h3 className="text-3xl font-serif font-light italic">Complete the look</h3>
          <button className="text-[10px] uppercase font-bold tracking-widest-label border-b border-black pb-1 hover:opacity-50 transition-opacity">
            View Archive
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-white">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-normal mb-1">{p.name}</h4>
              <p className="text-sm font-serif italic text-gray-500">€{p.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
