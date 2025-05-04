'use client';
import { useState, useEffect, useCallback } from 'react';
import { IconStar, IconRefresh } from '@tabler/icons-react';
import { fetchCategories, Category } from '../services/api';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

const platforms: FilterOption[] = [
  { id: 'pc', label: 'PC' },
  { id: 'ps5', label: 'PlayStation 5' },
  { id: 'ps4', label: 'PlayStation 4' },
  { id: 'xbox', label: 'Xbox Series' },
  { id: 'switch', label: 'Nintendo Switch' },
];

const types: FilterOption[] = [
  { id: 'paid', label: 'Paid' },
  { id: 'free', label: 'Free' },
];

interface ProductFiltersProps {
  onCategoryChange?: (categories: string[]) => void;
  onPriceRangeChange?: (priceRange: [number, number]) => void;
  onRatingChange?: (rating: number) => void;
}

const ProductFilters = ({ onCategoryChange, onPriceRangeChange, onRatingChange }: ProductFiltersProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [tempRating, setTempRating] = useState<number>(0);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const apiCategories = await fetchCategories();
      setCategories(apiCategories);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCategoryChange = (slug: string) => {
    setTempSelectedCategories(prev => {
      const newCategories = prev.includes(slug)
        ? prev.filter(id => id !== slug)
        : [...prev, slug];
      return newCategories;
    });
  };

  const handlePriceRangeChange = (index: number, value: string) => {
    const numValue = value ? parseInt(value) : 0;
    setTempPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = numValue;
      return newRange;
    });
  };

  const handleRatingChange = (rating: number) => {
    setTempRating(rating);
  };

  const handleApplyFilters = () => {
    setSelectedCategories(tempSelectedCategories);
    setPriceRange(tempPriceRange);
    setSelectedRating(tempRating);
    onCategoryChange?.(tempSelectedCategories);
    onPriceRangeChange?.(tempPriceRange);
    onRatingChange?.(tempRating);
  };

  if (loading) {
    return (
      <div
        style={{
          width: '258px',
          height: '1320px',
          borderRadius: '10px',
          background: '#3D352A80',
          backdropFilter: 'blur(40px)',
          boxShadow: '0px 4px 24px -1px #00000033',
          animationTimingFunction: 'ease-in',
          animationDuration: '300ms',
          padding: '24px',
        }}
        className="flex flex-col gap-8"
      >
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-700 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: '258px',
          height: '1320px',
          borderRadius: '10px',
          background: '#3D352A80',
          backdropFilter: 'blur(40px)',
          boxShadow: '0px 4px 24px -1px #00000033',
          animationTimingFunction: 'ease-in',
          animationDuration: '300ms',
          padding: '24px',
        }}
        className="flex flex-col gap-8"
      >
        <div className="text-center">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button
            onClick={loadCategories}
            className="flex items-center justify-center gap-2 text-[#E6B322] hover:text-[#f4c13d] transition-colors mx-auto"
          >
            <IconRefresh size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '258px',
        height: '1320px',
        borderRadius: '10px',
        background: '#3D352A80',
        backdropFilter: 'blur(40px)',
        boxShadow: '0px 4px 24px -1px #00000033',
        animationTimingFunction: 'ease-in',
        animationDuration: '300ms',
        padding: '24px',
      }}
      className="flex flex-col gap-8"
    >
      {/* Categories */}
      <div>
        <h3
          style={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'left',
          }}
          className="mb-4 text-white"
        >
          Categories
        </h3>
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar">
          {categories.map((category) => (
            <label 
              key={category.slug} 
              className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer"
            >
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#E6B322]"
                checked={tempSelectedCategories.includes(category.slug)}
                onChange={() => handleCategoryChange(category.slug)}
              />
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
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3
          style={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'left',
          }}
          className="mb-4 text-white"
        >
          Price
        </h3>
        <div className="flex items-center gap-2">
          <div style={{ position: 'relative', width: '80px', height: '40px' }}>
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '20px',
              pointerEvents: 'none',
            }}>$</span>
            <input
              type="text"
              value={tempPriceRange[0]}
              onChange={e => handlePriceRangeChange(0, e.target.value)}
              style={{
                background: '#28221C',
                border: '1px solid #AFA08A',
                borderRadius: '10px',
                width: '80px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '20px',
                color: 'white',
                textAlign: 'center',
                outline: 'none',
                paddingLeft: '28px',
              }}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <span className="text-white text-lg">-</span>
          <div style={{ position: 'relative', width: '80px', height: '40px' }}>
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '20px',
              pointerEvents: 'none',
            }}>$</span>
            <input
              type="text"
              value={tempPriceRange[1]}
              onChange={e => handlePriceRangeChange(1, e.target.value)}
              style={{
                background: '#28221C',
                border: '1px solid #AFA08A',
                borderRadius: '10px',
                width: '80px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '20px',
                color: 'white',
                textAlign: 'center',
                outline: 'none',
                paddingLeft: '28px',
              }}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div>
        <h3
          style={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'left',
          }}
          className="mb-4 text-white"
        >
          Ratings
        </h3>
        <div className="flex flex-col gap-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label 
              key={rating} 
              className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => handleRatingChange(rating)}
            >
              <input 
                type="radio" 
                name="rating" 
                className="form-radio h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#E6B322]"
                checked={tempRating === rating}
                onChange={() => {}}
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <IconStar key={i} size={16} fill="#E6B322" stroke={0} />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <IconStar key={i} size={16} className="text-gray-600" stroke={0} />
                ))}
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
                  & Up
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={handleApplyFilters}
        style={{
          width: '218px',
          height: '45px',
          gap: '10px',
          borderRadius: '30px',
          paddingRight: '22px',
          paddingLeft: '22px',
          background: '#E58E27',
          color: 'white',
        }}
        className="font-medium"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilters; 