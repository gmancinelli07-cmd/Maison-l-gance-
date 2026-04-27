export default function Footer() {
  const links = ['Contact', 'Shipping & Returns', 'Stores', 'Privacy', 'Terms'];

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-20">
      <div className="max-w-[1440px] mx-auto px-8 py-24 flex flex-col items-center space-y-16">
        <h2 className="text-xl font-light tracking-[0.4em] uppercase font-serif">
          Maison Élégance
        </h2>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {links.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-[10px] uppercase font-bold tracking-widest-label text-gray-400 hover:text-black transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="text-[9px] uppercase tracking-[0.2em] text-gray-300 font-medium">
          © {new Date().getFullYear()} Maison Élégance. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
