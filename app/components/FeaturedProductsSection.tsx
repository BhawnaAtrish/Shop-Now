'use client';
import Link from 'next/link';
import ProductTrendingCard from './ProductTrendingCard';

interface Product {
  id: number;
  title: string;
  tags: string;
  brand: string;
  price: number;
  rating: number;
  thumbnail?: string;
  description?: string;
}

interface FeaturedProductsSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  wideLayout?: boolean;
  className?: string;
}

const FeaturedProductsSection = ({
  title,
  products,
  viewAllLink,
  wideLayout = false,
  className = '',
}: FeaturedProductsSectionProps) => {
  return (
    <section className={`w-full bg-black py-10 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="text-[#E6B322] text-sm font-semibold flex items-center gap-2 hover:text-[#f4c13d] transition-colors"
            >
              VIEW ALL <span>→</span>
            </Link>
          )}
        </div>
        {wideLayout ? (
          <div className="flex flex-col gap-8">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="block group">
                <div
                  className="bg-gradient-to-b from-[#1A1A1A] to-[#2A2A2A] rounded-2xl shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between group-hover:shadow-2xl transition-shadow"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-400 font-bold text-xs">#1 best seller</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill={i < product.rating ? '#E6B322' : 'none'}
                            stroke="#E6B322"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-poppins">{product.title}</h2>
                    <div className="uppercase text-xs text-gray-400 mb-2">{product.tags}</div>
                    <p className="text-gray-200 mb-6 max-w-2xl">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-4 mb-2">
                      <button
                        className="font-semibold flex items-center justify-center"
                        style={{
                          width: '140px',
                          height: '45px',
                          borderRadius: '30px',
                          background: '#E58E27',
                          color: 'white',
                        }}
                        type="button"
                        tabIndex={-1}
                        onClick={e => e.preventDefault()}
                      >
                        Buy Now
                      </button>
                    </div>
                    <div className="text-xs text-gray-400">Buy now for ${product.price} only</div>
                  </div>
                  {product.thumbnail && (
                    <div className="hidden md:block md:ml-8 flex-shrink-0">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-[180px] h-[140px] object-cover rounded-xl border border-[#fff2] shadow"
                      />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {products.map((product) => (
              <ProductTrendingCard
                key={product.id}
                title={product.title}
                tags={product.tags}
                brand={product.brand}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection; 