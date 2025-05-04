import { IconStar } from "@tabler/icons-react";

interface ProductTrendingCardProps {
  title: string;
  tags: string;
  brand: string;
  price: number;
  rating: number;
  onBuy?: () => void;
  onClick?: () => void;
}

const ProductTrendingCard = ({
  title,
  tags,
  brand,
  price,
  rating,
  onBuy,
  onClick,
}: ProductTrendingCardProps) => {
  return (
    <div
      className="bg-[#FFF7E1] rounded-[10px] p-3 sm:p-4 w-full max-w-[341px] h-[320px] sm:h-[383px] flex flex-col justify-end flex-shrink-0 shadow cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-['Aoboshi_One'] font-normal text-lg sm:text-[30px] leading-[100%] tracking-normal mb-2 text-black">
        {title}
      </h3>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <IconStar
            key={i}
            size={20}
            fill={i < rating ? "#E58F28" : "none"}
            stroke="#E58F28"
            className="mr-1"
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 mb-1">{tags}</div>
      <div className="text-xs sm:text-sm text-gray-700 mb-3">by {brand}</div>
      <div className="flex items-center justify-between gap-2 sm:gap-4 mt-auto">
        <div className="font-bold text-base sm:text-xl text-black">${price}</div>
        <button
          className="font-semibold flex items-center justify-center w-[110px] sm:w-[300px] h-[38px] sm:h-[53px] rounded-[30px] bg-[#E58E27] text-white text-xs sm:text-base"
          onClick={e => {
            e.stopPropagation();
            onBuy && onBuy();
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductTrendingCard; 