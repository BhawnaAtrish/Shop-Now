"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";
import ProductTrendingCard from '../../components/ProductTrendingCard';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  brand: string;
  category: string;
  [key: string]: any;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("users");
    if (!user) {
      router.replace("/signup");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product?.images?.length) return;
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 200);
    return () => clearTimeout(timeout);
  }, [product]);

  if (!authChecked) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <Topbar isSidebarExpanded={false} />
      {product && (
        <div className="w-full flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto px-4 pt-[90px]">
          <div className="flex-1 w-full">
            <div className="relative w-full h-[250px] md:h-[400px] bg-[#23201A] rounded-xl flex items-center justify-center overflow-hidden border border-[#fff2]">
              {product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className={`absolute w-full h-full object-contain transition-opacity duration-[3000ms] ${
                    fade ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                  style={{ background: "#23201A" }}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center pt-8 md:pt-12">
        {loading || !product ? (
          <div className="text-white text-xl">Loading...</div>
        ) : (
          <div className="w-full max-w-3xl flex flex-col items-center">
            {/* Product Details */}
            <div className="w-full mt-8 px-4 text-white flex flex-col items-center justify-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 font-poppins text-[#E58E27] text-center">
                {product.title}
              </h1>
              {/* Rating */}
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={i < Math.round(product.rating) ? "#E58F28" : "none"}
                    stroke="#E58F28"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="mb-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-lg sm:text-2xl font-semibold text-[#E58E27]">
                <span>${product.price}</span>
                <button
                  className="font-semibold flex items-center justify-center w-full sm:w-[181.84px] h-[45px] sm:h-[53px] rounded-[30px] bg-[#E58E27] text-white text-base sm:text-lg"
                >
                  Buy Now
                </button>
              </div>
              <div className="mb-4 text-gray-300 text-sm sm:text-base font-poppins text-left w-full max-w-2xl">
                {product.description}
              </div>
              {/* Additional Product Information */}
              <div className="w-full max-w-3xl mt-10 px-2 sm:px-4 text-white">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#E6B322]">
                  Product Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#ccc] bg-[#1E1E1E] p-4 rounded-xl border border-[#333]">
                  <div>
                    <span className="text-[#E6B322] font-medium">Brand:</span>{" "}
                    {product.brand}g
                  </div>
                  <div>
                    <span className="text-[#E6B322] font-medium">
                      Category:
                    </span>{" "}
                    {product.category}
                  </div>
                  <div>
                    <span className="text-[#E6B322] font-medium">
                      Weight:
                    </span>{" "}
                    {product.weight}g
                  </div>
                  <div>
                    <span className="text-[#E6B322] font-medium">
                      Dimensions:
                    </span>{" "}
                    {product.dimensions.width} x {product.dimensions.height} x{" "}
                    {product.dimensions.depth} cm
                  </div>
                  <div>
                    <span className="text-[#E6B322] font-medium">
                      Warranty:
                    </span>{" "}
                    {product.warrantyInformation}
                  </div>
                  <div>
                    <span className="text-[#E6B322] font-medium">
                      Shipping:
                    </span>{" "}
                    {product.shippingInformation}
                  </div>
                  <div>
                    <span className="text-[#E6B322] font-medium">
                      Availability:
                    </span>{" "}
                    {product.availabilityStatus}
                  </div>
                  <div>
                    <span className="text-[#E6B322] font-medium">
                      Return Policy:
                    </span>{" "}
                    {product.returnPolicy}
                  </div>
                </div>
              </div>
            </div>
            {/* Reviews Section */}
            <div className="mt-16 w-full bg-[#1D1B16] py-10 px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[#E6B322] text-2xl font-bold">
                    Reviews from our customers
                  </h2>
                  <button className="text-[#E6B322] text-sm underline">
                    View All →
                  </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                  {product.reviews?.map((review: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        background: '#DAB785',
                        backdropFilter: 'blur(40px)',
                        boxShadow: '0px 4px 24px -1px #00000033',
                        color: 'black',
                      }}
                      className="p-4 rounded-xl min-w-[300px] max-w-[320px] flex-shrink-0"
                    >
                      <div className="text-sm font-semibold mb-1">{review.reviewerName}</div>
                      <hr style={{ borderColor: 'black', margin: '8px 0' }} />
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill={i < review.rating ? "#E58E27" : "none"}
                            stroke="#E58E27"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 w-full min-h-[500px] bg-gradient-to-br from-black via-[#1c0f00] to-[#2a1a00] text-white px-6 py-10 flex flex-col md:flex-row items-center justify-between">
              {/* Left Side: Thumbnail Placeholder */}
              <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
                <div className="md:w-[300px] md:h-[250px] rounded-[2px] relative">
                  <img src={product.thumbnail} />
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-1/2 text-center md:text-left px-2 md:px-10">
                <h2 className="text-lg text-[#e5aa56] tracking-widest font-semibold mb-1">
                  {product.category}
                </h2>
                <h1 className="text-4xl md:text-5xl font-bold text-[#fcd998] mb-6">
                  {product.title}
                </h1>

                <p className="text-sm text-gray-300 mb-4">
                 {product.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button className="bg-[#f79b27] text-black font-semibold px-8 py-3 rounded-full shadow hover:bg-[#e58e27] transition-all">
                    Buy Now
                  </button>

                  <div className="flex items-center gap-2 text-sm mt-2 sm:mt-0">
                    <span className="text-gray-300">{product.availabilityStatus}</span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-400">
                  Buy now for ${product.price} only
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Products recommended for you section */}
      <section className="w-full bg-[#1D1B16] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Products recommended for you</h2>
            <button className="text-[#E6B322] text-sm font-semibold flex items-center gap-2">VIEW ALL <span>→</span></button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {[
              { id: 1, title: 'Wireless Headphones', tags: 'Best Seller, Fast Shipping', brand: 'SoundMax', price: 99, rating: 5 },
              { id: 2, title: 'Smart Watch', tags: 'Top Rated, New Arrival', brand: 'TimeTech', price: 149, rating: 4 },
              { id: 3, title: 'Eco Water Bottle', tags: 'Eco Friendly, Trending', brand: 'GreenSip', price: 25, rating: 5 },
              { id: 4, title: 'Bluetooth Speaker', tags: 'Hot Deal, Limited Stock', brand: 'BoomBox', price: 59, rating: 4 }
            ].map((product) => (
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
        </div>
      </section>
      <Footer />
    </div>
  );
}
