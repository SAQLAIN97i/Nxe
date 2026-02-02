import { useEffect, useRef } from 'react';
import { Heart, X, ExternalLink, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistSection({ onProductClick, onToast }) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [wishlist]);

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    if (onToast) {
      onToast(`Removed ${product.name} from wishlist`, 'info');
    }
  };

  const handleClear = () => {
    clearWishlist();
    if (onToast) {
      onToast('Wishlist cleared', 'info');
    }
  };

  if (wishlist.length === 0) return null;

  return (
    <section id="wishlist" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="glow-orb glow-pink w-[500px] h-[500px] -bottom-40 -left-40 opacity-20" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="animate-on-scroll opacity-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-accent-pink/20">
                <Heart size={24} className="text-accent-pink" />
              </div>
              <div>
                <p className="category-label mb-1">YOUR COLLECTION</p>
                <h2 className="headline-section text-white">
                  WISHLIST <span className="text-accent-pink">({wishlist.length})</span>
                </h2>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="btn-secondary flex items-center gap-2 self-start"
            >
              <X size={16} />
              <span>Clear All</span>
            </button>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product, index) => (
              <div
                key={product.id}
                className="animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="product-card-premium group cursor-pointer" onClick={() => onProductClick(product)}>
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(product);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all z-10"
                    >
                      <X size={14} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="category-label mb-2">{product.category}</p>
                    <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-accent-pink transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-heading font-bold text-accent-cyan">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-text-muted line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(product.affiliateLink, '_blank');
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-accent-cyan/10 hover:bg-accent-cyan text-accent-cyan hover:text-luxury-black text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} />
                      <span>Buy Now</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
