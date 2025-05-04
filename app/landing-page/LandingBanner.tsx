'use client';
import ProductCarousel from '../components/ProductCarousel';

const bannerImages = [
  {
    id: 1,
    src: '/images/banner1.jpg',
    alt: 'Featured Game 1'
  },
  {
    id: 2,
    src: '/images/banner2.jpg',
    alt: 'Featured Game 2'
  },
  {
    id: 3,
    src: '/images/banner3.jpg',
    alt: 'Featured Game 3'
  },
  {
    id: 4,
    src: '/images/banner4.jpg',
    alt: 'Featured Game 4'
  }
];

const LandingBanner = () => {
  return (
    <section className="w-full bg-[#0F0F0F] py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <ProductCarousel images={bannerImages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingBanner; 