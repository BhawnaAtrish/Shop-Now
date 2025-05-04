"use client";
import { IconStar } from "@tabler/icons-react";
import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  image: string;
  price: number;
  rating: number;
  tags: string[];
  releaseDate: string;
}

const ProductCard = ({
  title,
  image,
  price,
  rating,
  tags,
  releaseDate,
}: ProductCardProps) => {
  return (
    <div className="bg-[#FFF7E1] rounded-[10px] p-4 w-[300px] h-[383px] flex flex-col justify-end flex-shrink-0 shadow">
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-col flex-1 justify-end">
        <h3 className="font-['Aoboshi_One'] font-normal text-[30px] leading-[100%] tracking-normal mb-2 text-black">{title}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <IconStar
              key={i}
              size={24}
              fill={i < rating ? '#E58F28' : 'none'}
              stroke="#E58F28"
              className="mr-1"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            style={{
              color: '#F44336',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {tags.filter(Boolean).map((tag, idx) => (
              <>
                {idx > 0 && <span style={{ margin: '0 8px', fontSize: '20px' }}>•</span>}
                <span key={tag}>{tag}</span>
              </>
            ))}
          </span>
        </div>
        <div className="text-gray-400 text-sm mb-3">{releaseDate}</div>
        <div className="flex items-center justify-between gap-4 mt-auto">
          <div className="font-bold text-xl text-black">${price}</div>
          <span
            className="font-semibold flex items-center justify-center"
            style={{
              width: '181.84px',
              height: '53px',
              borderRadius: '30px',
              background: '#E58E27',
              color: 'white',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Shop Now
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
