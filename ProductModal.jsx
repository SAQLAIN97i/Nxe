import { useEffect } from 'react';
import { X, Star, ExternalLink, Check, Package, Shield, Truck, Heart, ShoppingCart, Zap } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export default function ProductModal({ product, isOpen, onClose, onToast }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const isLiked = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      addToRecentlyViewed(product);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, product, addToRecentlyViewed]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleWishlistClick = () => {
    if (!product) return;
    const added = toggleWishlist(product);
    if (onToast) {
      onToast(
        added ? `Added ${product.name} to wishlist` : `Removed ${product.name} from wishlist`,
        added ? 'success' : 'info'
      );
    }
  };

  const handleBuyClick = () => {
    if (!product) return;
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] modal-backdrop flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-luxury-dark border border-white/10 shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X size={24} className="text-text-secondary" />
        </button>

        <div className="flex flex-col lg:flex-row overflow-y-auto max-h-[90vh]">
          {/* Left - Image */}
          <div className="lg:w-1/2 p-6 lg:p-8 bg-gradient-to-br from-white/5 to-transparent">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative overflow-hidden">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-accent-cyan/10 via-transparent to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isNew && (
                  <span className="px-3 py-1 bg-accent-purple text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    SAVE {product.discount}%
                  </span>
                )}
              </div>

              <img
                src={product.image}
                alt={product.name}
                className="w-[80%] h-[80%] object-contain relative z-10"
              />
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="text-center p-4 rounded-xl glass">
                <Star className="w-5 h-5 text-yellow-400 mx-auto mb-2" fill="currentColor" />
                <p className="text-xl font-heading font-bold text-white">{product.rating}</p>
                <p className="text-xs text-text-muted">Rating</p>
              </div>
              <div className="text-center p-4 rounded-xl glass">
                <Package className="w-5 h-5 text-accent-cyan mx-auto mb-2" />
                <p className="text-xl font-heading font-bold text-white">Prime</p>
                <p className="text-xs text-text-muted">Shipping</p>
              </div>
              <div className="text-center p-4 rounded-xl glass">
                <Shield className="w-5 h-5 text-accent-cyan mx-auto mb-2" />
                <p className="text-xl font-heading font-bold text-white">2yr</p>
                <p className="text-xs text-text-muted">Warranty</p>
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="lg:w-1/2 p-6 lg:p-8">
            {/* Category */}
            <p className="category-label mb-3">{product.category}</p>

            {/* Title */}
            <h2 className="font-heading font-bold text-2xl lg:text-3xl text-white mb-4">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
              </div>
              <span className="text-sm text-text-muted">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-heading font-bold text-accent-cyan">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-text-muted line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check size={16} className="text-accent-cyan mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                <Truck size={16} className="text-accent-cyan" />
                <span className="text-xs text-text-secondary">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                <Shield size={16} className="text-accent-cyan" />
                <span className="text-xs text-text-secondary">2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass">
                <Package size={16} className="text-accent-cyan" />
                <span className="text-xs text-text-secondary">30-Day Returns</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? 'In Stock - Ships Today' : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleBuyClick}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                <span>Buy on Amazon</span>
                <ExternalLink size={14} />
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleWishlistClick}
                  className={`flex-1 py-3 px-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                    isLiked
                      ? 'bg-accent-cyan border-accent-cyan text-luxury-black'
                      : 'border-white/10 hover:border-accent-cyan/50 text-text-secondary'
                  }`}
                >
                  <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                  <span className="text-sm">
                    {isLiked ? 'In Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
              </div>

              <p className="text-xs text-center text-text-muted">
                As an Amazon Associate, we earn from qualifying purchases
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
