import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface CatalogViewProps {
  onAddToCart: (product: Product) => void;
}

export default function CatalogView({ onAddToCart }: CatalogViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-[140px] pb-24 px-8 max-w-[1440px] mx-auto"
    >
      <header className="mb-20 text-center">
        <h1 className="text-5xl uppercase tracking-[0.2em] mb-6 font-serif">
          Summer Collection
        </h1>
        <p className="text-lg text-gray-500 italic max-w-xl mx-auto font-serif font-light">
          An exploration of light, form, and the enduring beauty of linen.
        </p>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 mb-16 gap-8">
        <div className="flex flex-wrap gap-12">
          {['Category', 'Color', 'Size'].map((filter) => (
            <button key={filter} className="text-[10px] uppercase font-bold tracking-widest-label flex items-center gap-2 hover:opacity-60 transition-opacity">
              {filter} <ChevronDown size={14} strokeWidth={1.5} />
            </button>
          ))}
        </div>
        <div className="text-[10px] uppercase font-bold tracking-widest-label text-gray-400">
          Showing {PRODUCTS.length} of {PRODUCTS.length} Items
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-24">
        {PRODUCTS.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`group cursor-pointer ${product.isWide ? 'lg:col-span-2' : ''}`}
            onClick={() => onAddToCart(product)}
          >
            <div className={`relative overflow-hidden bg-white mb-6 transition-all duration-700 ${product.isWide ? 'aspect-[16/9]' : 'aspect-[3/4]'}`}>
               <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
            </div>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-sm uppercase tracking-widest font-normal">{product.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  {product.category} / {product.material}
                </p>
              </div>
              <span className="text-lg font-serif">€{product.price.toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 flex justify-center">
        <button className="bg-black text-white px-16 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gray-900 transition-colors">
          Load More Pieces
        </button>
      </div>
    </motion.div>
  );
}
