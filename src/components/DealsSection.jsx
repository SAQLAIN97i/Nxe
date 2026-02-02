import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, TrendingDown, Zap } from 'lucide-react';
import { products } from '../data/products';

export default function DealsSection({ onProductClick, onToast }) {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  // Get products with discounts
  const deals = products
    .filter((p) => p.discount > 0)
    .sort((a, b) => b.discount - a.discount);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons, { passive: true });
      checkScrollButtons();
      return () => carousel.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

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
  }, []);

  return (
    <section id="deals" ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark via-luxury-black to-luxury-dark" />
      <div className="glow-orb glow-cyan w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 mb-10">
          <div className="max-w-7xl mx-auto">
            <div className="animate-on-scroll opacity-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={20} className="text-accent-cyan" />
                  <p className="category-label text-accent-cyan">FLASH SALE</p>
                </div>
                <h2 className="headline-section text-white mb-2">
                  HOT <span className="text-gradient">DEALS</span>
                </h2>
                <p className="text-text-secondary">Limited time offers on premium tech</p>
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-3 glass rounded-xl">
                  <Clock size={18} className="text-accent-cyan" />
                  <div className="flex items-center gap-1 font-mono text-lg">
                    <span className="text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-text-muted">:</span>
                    <span className="text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-text-muted">:</span>
                    <span className="text-accent-cyan">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={`p-3 rounded-xl glass transition-all ${
                      canScrollLeft
                        ? 'hover:bg-white/10 hover:border-accent-cyan/50'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={`p-3 rounded-xl glass transition-all ${
                      canScrollRight
                        ? 'hover:bg-white/10 hover:border-accent-cyan/50'
                        : 'opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {deals.map((product, index) => (
            <div
              key={product.id}
              className="animate-on-scroll opacity-0 flex-shrink-0 w-[300px] snap-start"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="group cursor-pointer glass rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent-cyan/30 transition-all duration-300 hover:shadow-glow"
                onClick={() => onProductClick(product)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6">
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
                    <TrendingDown size={14} />
                    SAVE {product.discount}%
                  </div>

                  {/* Prime Badge */}
                  {product.prime && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-[#00A8E1]/20 text-[#00A8E1] text-[10px] font-bold rounded">
                      PRIME
                    </div>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="category-label mb-2">{product.category}</p>

                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-accent-cyan transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-heading font-bold text-accent-cyan">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-text-muted line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress Bar - Limited Stock */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-text-muted">Limited Stock</span>
                      <span className="text-red-400">Only {Math.floor(Math.random() * 10 + 3)} left</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        style={{ width: `${Math.random() * 40 + 20}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button 
                    className="w-full py-3 px-4 rounded-xl bg-accent-cyan/10 hover:bg-accent-cyan text-accent-cyan hover:text-luxury-black text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(product.affiliateLink, '_blank');
                    }}
                  >
                    <span>Grab Deal</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 mt-6">
          <div className="max-w-md mx-auto">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink rounded-full transition-all duration-300"
                style={{
                  width: carouselRef.current
                    ? `${(carouselRef.current.scrollLeft /
                        (carouselRef.current.scrollWidth - carouselRef.current.clientWidth)) *
                        100}%`
                    : '0%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
