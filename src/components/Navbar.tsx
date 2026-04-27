import { useState, useEffect } from 'react';
import { User, ShoppingBag, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  activeView: 'catalog' | 'cart';
}

export default function Navbar({ cartCount, onCartClick, onLogoClick, activeView }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm py-4 border-b border-gray-200' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 flex justify-between items-center">
        <button 
          onClick={onLogoClick}
          className="text-2xl font-light tracking-widest-extra uppercase font-serif hover:opacity-60 transition-opacity"
        >
          Maison Élégance
        </button>

        <nav className="hidden md:flex items-center space-x-12">
          {['Collections', 'Editorial', 'Archive', 'About'].map((item) => (
            <button
              key={item}
              className={`text-[10px] uppercase font-semibold tracking-widest-label transition-all duration-300 pb-1 border-b ${
                activeView === 'catalog' && item === 'Collections'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400 hover:text-black'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-6">
          <button className="hover:opacity-40 transition-opacity">
            <User size={20} strokeWidth={1} />
          </button>
          <button 
            onClick={onCartClick}
            className="hover:opacity-40 transition-opacity relative"
          >
            <ShoppingBag size={20} strokeWidth={1} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button className="md:hidden hover:opacity-40 transition-opacity">
            <Menu size={20} strokeWidth={1} />
          </button>
        </div>
      </div>
    </header>
  );
}
