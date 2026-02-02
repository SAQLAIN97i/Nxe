import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { products, categories, searchProducts } from '../data/products';
import { Grid, List, Filter, ChevronDown, Search, SlidersHorizontal } from 'lucide-react';

export default function ProductsSection({ searchQuery, onToast }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const sectionRef = useRef(null);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = searchQuery
      ? searchProducts(searchQuery)
      : products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    filtered = filtered.filter(p => p.rating >= minRating);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered = [...filtered].sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
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
  }, [filteredProducts]);

  return (
    <section id="products" ref={sectionRef} className="py-20 lg:py-32 relative">
      {/* Background Glow */}
      <div className="glow-orb glow-purple w-[800px] h-[800px] -top-40 -right-40 opacity-30" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="animate-on-scroll opacity-0 text-center mb-12">
            <p className="category-label mb-4">OUR COLLECTION</p>
            <h2 className="headline-section text-white mb-4">
              FEATURED <span className="text-gradient">PRODUCTS</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Discover premium tech products handpicked for quality and value. 
              Exclusive deals updated daily.
            </p>
          </div>

          {/* Filters & Controls */}
          <div className="animate-on-scroll opacity-0 mb-8" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-accent-cyan text-luxury-black'
                        : 'glass text-text-secondary hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-text-secondary hover:text-white transition-colors"
                  >
                    <SlidersHorizontal size={16} />
                    <span className="text-sm">Filters</span>
                    <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>

                  {showFilters && (
                    <div className="absolute right-0 top-full mt-2 w-72 glass-strong rounded-2xl shadow-glass z-20 p-4">
                      {/* Price Range */}
                      <div className="mb-4">
                        <label className="text-sm text-text-secondary mb-2 block">Price Range</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-20 px-3 py-2 bg-white/5 rounded-lg text-sm text-white"
                          />
                          <span className="text-text-muted">-</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-20 px-3 py-2 bg-white/5 rounded-lg text-sm text-white"
                          />
                        </div>
                      </div>

                      {/* Rating Filter */}
                      <div className="mb-4">
                        <label className="text-sm text-text-secondary mb-2 block">Minimum Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setMinRating(star === minRating ? 0 : star)}
                              className={`p-2 rounded-lg transition-colors ${
                                star <= minRating ? 'bg-accent-cyan/20 text-accent-cyan' : 'bg-white/5 text-text-muted'
                              }`}
                            >
                              {star}★
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Reset */}
                      <button
                        onClick={() => {
                          setPriceRange([0, 2000]);
                          setMinRating(0);
                        }}
                        className="w-full py-2 text-sm text-accent-cyan hover:text-white transition-colors"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2.5 pr-10 rounded-xl glass text-text-secondary text-sm focus:outline-none focus:border-accent-cyan/50 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Biggest Savings</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex items-center gap-1 p-1 rounded-xl glass">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-accent-cyan text-luxury-black' : 'text-text-secondary'
                    }`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-accent-cyan text-luxury-black' : 'text-text-secondary'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-text-muted">
              Showing <span className="text-white font-medium">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && (
                <span> for <span className="text-accent-cyan">"{searchQuery}"</span></span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-on-scroll opacity-0"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard
                    product={product}
                    onClick={handleProductClick}
                    onToast={onToast}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl">
              <Search size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary text-lg mb-2">No products found</p>
              <p className="text-text-muted text-sm">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToast={onToast}
      />
    </section>
  );
}
