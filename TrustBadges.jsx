import { useEffect, useRef } from 'react';
import { Shield, Truck, RefreshCw, Headphones, Award, Lock } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
    color: 'cyan',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
    color: 'purple',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
    color: 'pink',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated help center',
    color: 'cyan',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Handpicked products',
    color: 'purple',
  },
  {
    icon: Lock,
    title: 'Privacy Protected',
    description: 'Your data is safe',
    color: 'pink',
  },
];

export default function TrustBadges() {
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
  }, []);

  const getColorClass = (color) => {
    switch (color) {
      case 'cyan':
        return 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30';
      case 'purple':
        return 'text-accent-purple bg-accent-purple/10 border-accent-purple/30';
      case 'pink':
        return 'text-accent-pink bg-accent-pink/10 border-accent-pink/30';
      default:
        return 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30';
    }
  };

  return (
    <section ref={sectionRef} className="py-16 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="animate-on-scroll opacity-0 text-center mb-10">
            <p className="category-label mb-3">WHY CHOOSE US</p>
            <h2 className="headline-section text-white">
              SHOP WITH <span className="text-gradient">CONFIDENCE</span>
            </h2>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="animate-on-scroll opacity-0"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="group text-center p-6 glass rounded-2xl border border-white/[0.06] hover:border-accent-cyan/20 transition-all duration-300 hover:-translate-y-1">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 border ${getColorClass(badge.color)} transition-transform group-hover:scale-110`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-heading font-semibold text-sm text-white mb-1">
                      {badge.title}
                    </h3>
                    <p className="text-xs text-text-muted">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
