import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, TrendingDown, Star } from 'lucide-react';
import { products } from '../data/products';

export default function Hero({ onProductClick }) {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const featuredProduct = products[4]; // ProBook Ultra X1

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        {/* Glow Orbs */}
        <div className="glow-orb glow-cyan w-[600px] h-[600px] -top-48 -right-48 animate-pulse-glow" />
        <div className="glow-orb glow-purple w-[500px] h-[500px] bottom-0 left-0 animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="glow-orb glow-pink w-[400px] h-[400px] top-1/2 right-1/4 animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-cyan/30 mb-8 animate-float">
                <Sparkles size={14} className="text-accent-cyan" />
                <span className="text-xs font-semibold text-accent-cyan tracking-wider uppercase">
                  Premium Tech Deals
                </span>
              </div>

              {/* Headline */}
              <h1 className="headline-hero text-white mb-6">
                DISCOVER
                <br />
                <span className="text-gradient">ELITE TECH</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Curated collection of premium gadgets with exclusive affiliate deals. 
                Experience luxury technology at unbeatable prices.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-white">4.8 Rating</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                  <TrendingDown size={16} className="text-accent-cyan" />
                  <span className="text-sm text-white">Up to 25% Off</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
                  <Sparkles size={16} className="text-accent-purple" />
                  <span className="text-sm text-white">Prime Shipping</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#products" className="btn-primary inline-flex items-center justify-center gap-2 group">
                  <span>Explore Collection</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#deals" className="btn-secondary inline-flex items-center justify-center gap-2">
                  <TrendingDown size={18} />
                  <span>View Hot Deals</span>
                </a>
              </div>
            </div>

            {/* Right Content - Featured Product Card */}
            <div className="hidden lg:block relative">
              <div 
                className="relative"
                style={{
                  transform: `perspective(1000px) rotateX(${(mousePos.y - 0.5) * -10}deg) rotateY(${(mousePos.x - 0.5) * 10}deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {/* Product Card */}
                <div 
                  className="product-card-premium p-6 cursor-pointer"
                  onClick={() => onProductClick(featuredProduct)}
                >
                  {/* Image */}
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-8 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-radial from-accent-cyan/10 via-transparent to-transparent" />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-cyan text-luxury-black text-sm font-bold rounded-full">
                      -{featuredProduct.discount}%
                    </div>
                    
                    <img
                      src={featuredProduct.image}
                      alt={featuredProduct.name}
                      className="w-full h-full object-contain relative z-10"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <p className="category-label">Featured Product</p>
                    <h3 className="font-heading font-bold text-xl text-white">{featuredProduct.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                      <span className="text-xs text-text-muted ml-2">({featuredProduct.reviews.toLocaleString()})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-heading font-bold text-accent-cyan">
                        ${featuredProduct.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-text-muted line-through">
                        ${featuredProduct.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <button className="w-full btn-primary mt-4">View Details</button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 border border-accent-cyan/20 rounded-full animate-spin-slow" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-white/5 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent pointer-events-none" />
    </section>
  );
}
