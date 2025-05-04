'use client';
import Image from 'next/image';
import { useState } from 'react';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
}

const FallbackImage = ({ src, alt, className = '' }: FallbackImageProps) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? '/images/fallback-product.jpg' : src}
      alt={alt}
      width={800}
      height={600}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority
    />
  );
};

export default FallbackImage; 