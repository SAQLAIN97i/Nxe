import { useEffect, useRef } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export default function RecentlyViewed({ onProductClick }) {
  const { recentlyViewed } = useRecentlyViewed();
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
  }, [recentlyViewed]);

  if (recentlyViewed.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="animate-on-scroll opacity-0 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-text-muted" />
              <h3 className="font-heading font-bold text-xl text-white">
                Recently Viewed
              </h3>
            </div>
          </div>

          {/* Products Row */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {recentlyViewed.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="animate-on-scroll opacity-0 flex-shrink-0 w-[200px]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className="group cursor-pointer glass rounded-xl border border-white/[0.06] overflow-hidden hover:border-accent-cyan/30 transition-all"
                  onClick={() => onProductClick(product)}
                >
                  <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-text-muted line-clamp-1 mb-1">{product.name}</p>
                    <p className="text-sm font-bold text-accent-cyan">${product.price.toLocaleString()}</p>
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
