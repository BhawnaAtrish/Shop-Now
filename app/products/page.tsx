'use client';
import { useState, useEffect, useMemo } from 'react';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';
import { fetchProducts, fetchProductsByCategory, Product, ProductsResponse } from '../services/api';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import FeaturedProductsSection from '../components/FeaturedProductsSection';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1] &&
    (selectedRating === 0 || Math.round(product.rating) >= selectedRating)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'release-new':
        return b.id - a.id;
      case 'release-old':
        return a.id - b.id;
      case 'featured':
      default:
        return 0;
    }
  });

  const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const loadProducts = async (categories: string[] = []) => {
    try {
      setLoading(true);
      setError(null);
      
      if (categories.length > 0) {
        // If categories are selected, fetch products for each category
        const categoryProducts = await Promise.all(
          categories.map(category => fetchProductsByCategory(category))
        );
        const allProducts = categoryProducts.flatMap((response: ProductsResponse) => response.products);
        setProducts(allProducts);
      } else {
        // If no categories selected, fetch all products
        const response = await fetchProducts();
        setProducts(response.products);
      }
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    loadProducts(categories);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const relatedProducts = useMemo(() => {
    if (!searchQuery) return [];
    const searchCategories = new Set(filteredProducts.map(product => product.category));
    return products
      .filter(product =>
        !filteredProducts.some(p => p.id === product.id) &&
        searchCategories.has(product.category)
      )
      .slice(0, 4);
  }, [searchQuery, filteredProducts, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col">
        <Topbar isSidebarExpanded={isSidebarExpanded} />
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-[#1A1A1A] rounded-lg p-4">
                    <div className="h-48 bg-gray-700 rounded mb-4"></div>
                    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col">
        <Topbar isSidebarExpanded={isSidebarExpanded} />
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-medium mb-4">Error</h2>
              <p className="text-gray-400">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col text-white">
      <Topbar isSidebarExpanded={isSidebarExpanded} onSearch={handleSearch} />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="hidden md:block sticky top-20 h-fit min-w-[220px] max-w-xs">
              <ProductFilters 
                onCategoryChange={handleCategoryChange} 
                onPriceRangeChange={handlePriceRangeChange}
                onRatingChange={handleRatingChange}
              />
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Header Row with Title and Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 sm:gap-0">
                <div>
                  <h1 className="text-xl sm:text-2xl font-medium mb-2">
                    {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
                  </h1>
                  <p className="text-gray-400 text-sm sm:text-base">{filteredProducts.length} results found</p>
                </div>
                <div className="relative inline-block">
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex items-center justify-between bg-[#1A1A1A] text-white focus:outline-none cursor-pointer w-[98px] h-[39px] gap-[9px] rounded-[30px] border border-white px-3 py-2"
                  >
                    <span className="font-poppins font-normal text-[15px] text-center">Sort by</span>
                    <svg 
                      width="10" 
                      height="6" 
                      viewBox="0 0 10 6" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {isSortDropdownOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 bg-[#1A1A1A] shadow-lg overflow-hidden z-50 w-[200px] sm:w-[250px] rounded-[10px]"
                    >
                      <div 
                        onClick={() => {
                          setSortBy('featured');
                          setIsSortDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[#E6B322] hover:text-black cursor-pointer"
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                        }}
                      >
                        Featured
                      </div>
                      <div 
                        onClick={() => {
                          setSortBy('release-old');
                          setIsSortDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[#E6B322] hover:text-black cursor-pointer"
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                        }}
                      >
                        Release date: Old to New
                      </div>
                      <div 
                        onClick={() => {
                          setSortBy('release-new');
                          setIsSortDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[#E6B322] hover:text-black cursor-pointer"
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                        }}
                      >
                        Release date: New to Old
                      </div>
                      <div 
                        onClick={() => {
                          setSortBy('price-low');
                          setIsSortDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[#E6B322] hover:text-black cursor-pointer"
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                        }}
                      >
                        Price: Low to High
                      </div>
                      <div 
                        onClick={() => {
                          setSortBy('price-high');
                          setIsSortDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[#E6B322] hover:text-black cursor-pointer"
                        style={{
                          fontFamily: 'Poppins',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                        }}
                      >
                        Price: High to Low
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id} className="block">
                    <ProductCard
                      title={product.title}
                      image={product.thumbnail}
                      price={product.price}
                      rating={Math.round(product.rating)}
                      tags={[product.category, product.brand]}
                      releaseDate="Recently Added"
                    />
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-full font-semibold ${currentPage === 1 ? 'bg-gray-400 text-white' : 'bg-[#E6B322] text-black hover:bg-[#f4c13d]'}`}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-4 py-2 rounded-full font-semibold ${currentPage === idx + 1 ? 'bg-[#E58E27] text-white' : 'bg-[#FFF7E1] text-black hover:bg-[#E6B322]'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-full font-semibold ${currentPage === totalPages ? 'bg-gray-400 text-white' : 'bg-[#E6B322] text-black hover:bg-[#f4c13d]'}`}
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Related Products Section */}
              {searchQuery && relatedProducts.length > 0 && (
                <FeaturedProductsSection
                  title={`Checkout products similar to "${searchQuery}"`}
                  products={relatedProducts.map(product => ({
                    id: product.id,
                    title: product.title,
                    tags: `${product.category} • ${product.brand}`,
                    brand: product.brand,
                    price: product.price,
                    rating: Math.round(product.rating),
                    thumbnail: product.thumbnail,
                    description: product.description
                  }))}
                  wideLayout={true}
                  className="mt-16"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}