import { useState, useEffect, useRef } from 'react';
import { Mail, Send, Check, Sparkles, Gift, Bell } from 'lucide-react';

export default function Newsletter({ onToast }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');
    
    if (onToast) {
      onToast('Successfully subscribed to newsletter!', 'success');
    }
  };

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
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="glow-orb glow-cyan w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll opacity-0 glass-strong rounded-3xl p-8 lg:p-12 border border-white/10 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-accent-cyan/10 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-radial from-accent-purple/10 via-transparent to-transparent" />

            <div className="relative z-10 text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/30 mb-6">
                <Sparkles size={28} className="text-accent-cyan" />
              </div>

              {/* Headline */}
              <h2 className="headline-section text-white mb-4">
                GET <span className="text-gradient">EXCLUSIVE</span> ACCESS
              </h2>

              {/* Description */}
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, 
                flash sales, and exclusive member-only deals.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { icon: Gift, text: 'Member Discounts' },
                  { icon: Bell, text: 'Early Access' },
                  { icon: Check, text: 'No Spam Ever' },
                ].map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                    <benefit.icon size={14} className="text-accent-cyan" />
                    <span className="text-sm text-text-secondary">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                        size={18}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-text-muted focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary py-4 px-8 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-text-muted text-xs mt-4">
                    By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="max-w-md mx-auto p-8 glass rounded-2xl border border-accent-cyan/30">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                    <Check size={32} className="text-accent-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mb-2">
                    You&apos;re In!
                  </h3>
                  <p className="text-text-secondary">
                    Check your inbox for a welcome gift and exclusive deals.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
