import { useRef, useState } from 'react';
import { Star, Heart, ExternalLink, Check, Zap } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, onClick, onToast }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setTilt({
      x: y * -15,
      y: x * 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    if (onToast) {
      onToast(
        added ? `Added ${product.name} to wishlist` : `Removed ${product.name} from wishlist`,
        added ? 'success' : 'info'
      );
    }
  };

  const handleBuyClick = (e) => {
    e.stopPropagation();
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={cardRef}
      className="product-card-premium cursor-pointer group"
      onClick={() => onClick(product)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-accent-purple/20 text-accent-purple text-[10px] font-bold uppercase tracking-wider rounded-full border border-accent-purple/30">
              New
            </span>
          )}
          {product.isHot && (
            <span className="px-2.5 py-1 bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-orange-500/30 flex items-center gap-1">
              <Zap size={10} />
              Hot
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-2.5 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-red-500/30">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Prime Badge */}
        {product.prime && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 bg-[#00A8E1]/20 text-[#00A8E1] text-[10px] font-bold rounded flex items-center gap-1">
              <Check size={10} />
              PRIME
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute bottom-3 right-3 p-2.5 rounded-full transition-all z-10 ${
            isLiked
              ? 'bg-accent-cyan text-luxury-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Heart size={16} className={isLiked ? 'fill-current' : ''} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="category-label mb-2">{product.category}</p>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-accent-cyan transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
              />
            ))}
          </div>
          <span className="text-xs text-text-muted">({product.reviews.toLocaleString()})</span>
          <span className="text-xs text-yellow-400 font-medium">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-heading font-bold text-accent-cyan">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-text-muted line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-xs ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleBuyClick}
            className="flex-1 btn-primary py-3 text-sm flex items-center justify-center gap-2"
          >
            <span>Buy Now</span>
            <ExternalLink size={14} />
          </button>
          <button
            onClick={() => onClick(product)}
            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent-cyan/30 transition-all"
          >
            <span className="text-xs text-text-secondary">Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
