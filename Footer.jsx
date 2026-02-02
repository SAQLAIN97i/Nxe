import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone,
  ExternalLink,
  Heart,
  ArrowUpRight
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '#products' },
      { name: 'New Arrivals', href: '#products' },
      { name: 'Best Sellers', href: '#products' },
      { name: 'Deals', href: '#deals' },
      { name: 'Wishlist', href: '#wishlist' },
    ],
    categories: [
      { name: 'Cameras', href: '#categories' },
      { name: 'Drones', href: '#categories' },
      { name: 'Audio', href: '#categories' },
      { name: 'Computing', href: '#categories' },
      { name: 'Wearables', href: '#categories' },
    ],
    support: [
      { name: 'Contact Us', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Track Order', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Affiliate Program', href: '#' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Facebook', icon: Facebook, href: '#' },
  ];

  return (
    <footer id="contact" className="relative pt-20 pb-8">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a href="#home" className="inline-block mb-6">
                <span className="font-heading font-black text-3xl text-gradient tracking-tight">
                  LUXE
                </span>
              </a>

              <p className="text-text-secondary text-sm mb-6 max-w-sm leading-relaxed">
                Your premier destination for premium tech products. We curate the finest 
                gadgets with exclusive deals you won&apos;t find anywhere else.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Mail size={16} className="text-accent-cyan" />
                  <span>hello@luxe-premium.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Phone size={16} className="text-accent-cyan" />
                  <span>+1 (888) LUXE-TECH</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <MapPin size={16} className="text-accent-cyan" />
                  <span>San Francisco, California</span>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-heading font-bold text-white mb-5">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-accent-cyan transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Links */}
            <div>
              <h4 className="font-heading font-bold text-white mb-5">Categories</h4>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-accent-cyan transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-heading font-bold text-white mb-5">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-accent-cyan transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-heading font-bold text-white mb-5">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-accent-cyan transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-muted">
                <span>&copy; {currentYear} LUXE Premium. All rights reserved.</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  Crafted with <Heart size={12} className="text-accent-pink fill-accent-pink" />
                </span>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  Affiliate Disclosure
                  <ExternalLink size={10} />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-2.5 rounded-xl glass hover:bg-accent-cyan/20 text-text-muted hover:text-accent-cyan transition-all"
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Amazon Affiliate Notice */}
            <p className="mt-6 text-center text-xs text-text-muted/60 max-w-2xl mx-auto">
              As an Amazon Associate, we earn from qualifying purchases. Product prices and availability 
              are accurate as of the date/time indicated and are subject to change. 
              Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
