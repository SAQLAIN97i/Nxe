# LUXE Premium Affiliate Showcase

An ultra-premium, production-ready affiliate marketing website built with React, Vite, and Tailwind CSS. Features a luxury dark theme with glassmorphism effects, advanced animations, and comprehensive e-commerce functionality.

![LUXE Premium](https://via.placeholder.com/800x400/0b0b0f/00f0ff?text=LUXE+PREMIUM)

## Features

### Visual & Design
- **Global Glassmorphism System** - Frosted glass cards with backdrop blur
- **Black Luxury Theme** - Deep black (#0b0b0f) with gradient accents
- **Animated Gradient Borders** - On cards, buttons, and inputs
- **3D Tilt Effects** - Mouse-based tilt on product cards
- **Premium Shadow System** - Multi-layer shadows
- **Floating UI Elements** - Cards with slow motion animations
- **Luxury Typography** - Poppins headings, Inter body text
- **Custom Cursor** - Glow cursor for desktop
- **Noise Texture Overlay** - Cinematic premium look

### Animations & Motion
- **Scroll-based Animations** - Cards fade-in, text slide-up
- **Staggered Animations** - Products load one by one
- **Live Background Animation** - Gradient mesh with particles
- **Button Press Animation** - Micro compression effect
- **Page Loader Animation** - Logo with glow
- **Scroll Progress Bar** - Thin glass bar on top
- **Reduced-Motion Support** - For accessibility

### Functionality & UX
- **Smart Search** - Live suggestions with highlight
- **Advanced Filters** - Price, category, rating
- **Wishlist System** - LocalStorage based with heart icon
- **Quick View Modal** - View product without leaving page
- **Recently Viewed Products** - Auto-tracked
- **Toast Notifications** - "Added to cart", "Saved to wishlist"
- **Keyboard Navigation Support**
- **Lazy Loading Ready**

### Content & Trust
- **Premium Hero Section** - Strong headline with glass CTAs
- **Trust Badges** - Secure checkout, verified seller
- **Deal Countdown Timer** - Flash sale urgency
- **Newsletter Glass Box** - Glow input + button
- **Multi-column Footer** - Dark glass style

## Tech Stack

- **React 18** - UI library with hooks
- **Vite 5** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS
- **Lucide React** - Icon library
- **Context API** - State management
- **Custom Hooks** - Reusable logic

## Project Structure

```
luxe-premium/
├── public/
│   ├── images/              # All product images (8 products)
│   │   ├── product_camera.png
│   │   ├── product_drone.png
│   │   ├── product_headphones.png
│   │   ├── product_laptop.png
│   │   ├── product_laptop2.png
│   │   ├── product_speaker.png
│   │   ├── product_tablet.png
│   │   └── product_watch.png
│   └── vite.svg
├── src/
│   ├── components/          # 18 React components
│   │   ├── AnimatedBackground.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── DealsSection.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Newsletter.jsx
│   │   ├── PageLoader.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── RecentlyViewed.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── TrustBadges.jsx
│   │   └── WishlistSection.jsx
│   ├── context/             # React Context
│   │   ├── RecentlyViewedContext.jsx
│   │   └── WishlistContext.jsx
│   ├── data/
│   │   └── products.js      # Product data with affiliate links
│   ├── hooks/               # Custom hooks
│   │   ├── useLocalStorage.js
│   │   ├── useMousePosition.js
│   │   └── useToast.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.js           # GitHub Pages ready (base: './')
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or download this repository

```bash
cd luxe-premium
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Adding Your Amazon Affiliate Links

1. Open `src/data/products.js`

2. Find the product you want to update and replace the `affiliateLink`:

```javascript
{
  id: 1,
  name: "ActionCam 6K Pro",
  // ... other fields
  affiliateLink: "https://amazon.com/dp/YOUR-PRODUCT-ID?tag=YOUR-AFFILIATE-ID-20",
  // ...
}
```

3. Repeat for all products

## Customizing Products

Edit `src/data/products.js` to customize:

```javascript
{
  id: 1,
  name: "Your Product Name",
  category: "Category",
  price: 499,
  originalPrice: 599,
  discount: 17,
  rating: 4.8,
  reviews: 2341,
  image: "./images/your_image.png",
  description: "Your product description...",
  features: ["Feature 1", "Feature 2", ...],
  affiliateLink: "https://amazon.com/...",
  inStock: true,
  prime: true,
  badge: "Best Seller",
  isNew: false,
  isHot: true
}
```

## Deployment to GitHub Pages

### Method 1: Manual Deployment

1. Build the project

```bash
npm run build
```

2. The `dist` folder contains all built files

3. Upload the contents of `dist` to your GitHub Pages repository

### GitHub Pages Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select the branch (usually `main` or `gh-pages`)
5. Set folder to `/` (root) or `/dist`
6. Click **Save**

Your site will be live at: `https://yourusername.github.io/luxe-premium`

## Configuration

The `vite.config.js` is already configured for GitHub Pages:

```javascript
export default defineConfig({
  plugins: [react()],
  base: './',  // Relative paths for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

## Customization Guide

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  luxury: {
    black: '#0b0b0f',
    dark: '#111118',
    card: '#15151d',
  },
  accent: {
    cyan: '#00f0ff',
    purple: '#a855f7',
    blue: '#3b82f6',
    pink: '#ec4899',
  },
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import it in `App.jsx`
3. Add it to the main content area

## Performance

- Images are optimized for web
- Lazy loading ready
- CSS purged for production
- JavaScript minified and chunked
- GPU-accelerated animations

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this template for your own affiliate website!

---

**Built with passion for premium experiences**
