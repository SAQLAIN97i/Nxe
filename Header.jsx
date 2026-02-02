import { useState, useEffect } from 'react';
import { Search, Menu, X, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ searchQuery, setSearchQuery }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'Categories', href: '#categories' },
    { name: 'Deals', href: '#deals' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-strong shadow-glass'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <span className="font-heading font-black text-2xl text-gradient tracking-tight transition-transform group-hover:scale-105">
                LUXE
              </span>
            </a>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div
                className={`relative w-full transition-all duration-300 ${
                  isSearchFocused ? 'scale-105' : ''
                }`}
              >
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search premium products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm text-text-secondary hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Wishlist */}
              <a
                href="#wishlist"
                className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
              >
                <Heart size={20} className="text-text-secondary group-hover:text-accent-cyan transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-cyan text-luxury-black text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </a>

              {/* Mobile Search */}
              <button
                className="md:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setIsSearchFocused(!isSearchFocused)}
              >
                <Search size={20} className="text-text-secondary" />
              </button>

              {/* Mobile Menu */}
              <button
                className="lg:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-text-secondary" />
                ) : (
                  <Menu size={20} className="text-text-secondary" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchFocused && (
            <div className="md:hidden pb-4 animate-fade-in">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/50"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 glass-strong transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="font-heading font-bold text-3xl text-white hover:text-accent-cyan transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          <a
            href="#wishlist"
            className="flex items-center gap-3 mt-4 text-text-secondary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Heart size={24} />
            <span className="text-lg">Wishlist ({wishlistCount})</span>
          </a>
        </div>
      </div>
    </>
  );
}
