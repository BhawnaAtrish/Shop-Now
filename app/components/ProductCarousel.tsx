'use client';
import { useState, useCallback, useEffect } from 'react';
import FallbackImage from './FallbackImage';

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface ProductCarouselProps {
  images: ProductImage[];
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fade, setFade] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    // Reset animation flag after transition completes
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentIndex, isAnimating]);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  }, [currentIndex, images.length, goToSlide, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(prevIndex);
  }, [currentIndex, images.length, goToSlide, isAnimating]);

  // Fade-in effect for each image
  useEffect(() => {
    setFade(false);
    const fadeTimeout = setTimeout(() => setFade(true), 100);
    return () => clearTimeout(fadeTimeout);
  }, [currentIndex]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[220px] sm:h-[350px] md:h-[500px] overflow-hidden rounded-2xl bg-[#1A1A1A]">
      {/* Main Image */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out
              ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <FallbackImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-20"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-20"
        aria-label="Next slide"
      >
        →
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 
              ${index === currentIndex 
                ? 'bg-white w-4 sm:w-6' 
                : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative inline-block">
        <button
          onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
          className="flex items-center justify-between bg-[#1A1A1A] text-white focus:outline-none cursor-pointer"
          style={{
            width: '98px',
            height: '39px',
            gap: '9px',
            borderRadius: '30px',
            borderWidth: '1px',
            paddingTop: '8px',
            paddingRight: '12px',
            paddingBottom: '8px',
            paddingLeft: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
            }}
          >
            Sort by
          </span>
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
            className="absolute right-0 top-full mt-2 bg-[#1A1A1A] shadow-lg overflow-hidden z-50"
            style={{
              width: '306px',
              borderRadius: '10px',
            }}
          >
            {/* ...dropdown content... */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel; 