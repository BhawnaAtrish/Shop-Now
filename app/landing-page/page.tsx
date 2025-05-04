'use client';
import LandingBanner from './LandingBanner';
import FeaturedProductsSection from '../components/FeaturedProductsSection';

const trendingProducts = [
  { id: 1, title: 'Modern Living Room Furniture', tags: 'Trending, Best Seller', brand: 'HomeCraft', price: 299, rating: 5 },
  { id: 2, title: 'Fresh Groceries Delivered', tags: 'Essentials, Daily Needs', brand: 'FarmFresh', price: 49, rating: 4 },
  { id: 3, title: 'Latest Electronics & Gadgets', tags: 'New Arrivals, Hot Deals', brand: 'TechZone', price: 399, rating: 5 },
  { id: 4, title: 'Trendy Fashion Collection', tags: 'Summer Sale, Best Picks', brand: 'UrbanStyle', price: 79, rating: 4 },
];

const featuredProducts = [
  {
    id: 1,
    title: 'Modern Living Room Furniture',
    tags: 'Trending, Best Seller',
    brand: 'HomeCraft',
    price: 299,
    rating: 5,
    description: 'Upgrade your home with our stylish sofas, coffee tables, and more. Quality craftsmanship for every space.',
  },
  {
    id: 2,
    title: 'Fresh Groceries Delivered',
    tags: 'Essentials, Daily Needs',
    brand: 'FarmFresh',
    price: 49,
    rating: 4,
    description: 'Get farm-fresh fruits, vegetables, and pantry staples delivered to your door. Eat healthy, live better!',
  },
  {
    id: 3,
    title: 'Latest Electronics & Gadgets',
    tags: 'New Arrivals, Hot Deals',
    brand: 'TechZone',
    price: 399,
    rating: 5,
    description: 'Discover the newest smartphones, laptops, and accessories at unbeatable prices.',
  },
  {
    id: 4,
    title: 'Trendy Fashion Collection',
    tags: 'Summer Sale, Best Picks',
    brand: 'UrbanStyle',
    price: 79,
    rating: 4,
    description: 'Refresh your wardrobe with the latest styles in clothing, shoes, and accessories.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <LandingBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Most Trending Section */}
        <FeaturedProductsSection
          title="MOST TRENDING"
          products={trendingProducts}
          viewAllLink="/store"
        />

        {/* Featured Products Section */}
        <FeaturedProductsSection
          title="FEATURED PRODUCTS"
          products={featuredProducts}
          wideLayout={true}
          className="mt-8"
        />
      </div>
    </div>
  );
}