import { useState, useEffect } from 'react';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { useToast } from './hooks/useToast';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import PageLoader from './components/PageLoader';
import ToastContainer from './components/ToastContainer';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsSection from './components/ProductsSection';
import DealsSection from './components/DealsSection';
import WishlistSection from './components/WishlistSection';
import RecentlyViewed from './components/RecentlyViewed';
import TrustBadges from './components/TrustBadges';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import { products } from './data/products';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, removeToast, success, error, info } = useToast();

  // Handle smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Handle page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle product click for modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // Toast helper
  const showToast = (message, type = 'success') => {
    if (type === 'success') success(message);
    else if (type === 'error') error(message);
    else info(message);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-luxury-black relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero onProductClick={handleProductClick} />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Products Section */}
        <ProductsSection 
          searchQuery={searchQuery}
          onToast={showToast}
        />

        {/* Deals Section */}
        <DealsSection 
          onProductClick={handleProductClick}
          onToast={showToast}
        />

        {/* Wishlist Section */}
        <WishlistSection 
          onProductClick={handleProductClick}
          onToast={showToast}
        />

        {/* Recently Viewed */}
        <RecentlyViewed onProductClick={handleProductClick} />

        {/* Newsletter Section */}
        <Newsletter onToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToast={showToast}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

function App() {
  return (
    <WishlistProvider>
      <RecentlyViewedProvider>
        <AppContent />
      </RecentlyViewedProvider>
    </WishlistProvider>
  );
}

export default App;
