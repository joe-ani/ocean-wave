"use client"
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, TrendingUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { Product } from '@/data/products';
import { useRouter } from 'next/navigation';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.98 }
};

const likeColour = {
  on: "#ff3b5c",
  off: "#ffffff50"
};

export const ProductCard = ({ product }: { product: Product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref);
  const router = useRouter();

  const handleProductClick = () => {
    try {
      const slug = product.name.toLowerCase().replace(/\s+/g, '-');
      const productData = {
        name: product.name,
        price: product.price,
        img: product.image, // Ensure this matches the expected property in the product page
        // add other necessary properties
      };
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      router.push(`/product/${slug}`);
    } catch (error) {
      console.error('Error saving product data:', error);
      // Fallback navigation
      const slug = product.name.toLowerCase().replace(/\s+/g, '-');
      router.push(`/product/${slug}`);
    }
  };

  return (
    <motion.div
      ref={ref}
      onClick={handleProductClick}
      className="latest-product-card w-[150px] h-[200px] sm:w-[200px] sm:h-[250px] flex flex-col items-center p-4 
      bg-slate-200 relative rounded-[15px] sm:rounded-[25px] cursor-pointer transition-colors duration-200"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      whileTap="tap"
      variants={cardVariants}
      style={{
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "subpixel-antialiased"
      }}
    >
      {/* Heart icon */}
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}
        className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10 p-1 sm:p-2 cursor-pointer hover:scale-110 transition-transform"
      >
        <Heart
          className="stroke-none"
          fill={isLiked ? likeColour.on : likeColour.off}
          size={24}
          strokeWidth={1}
        />
      </div>

      {/* Product Image */}
      <div className="w-full h-[60%] relative flex items-center justify-center">
        <Image
          className="object-contain w-full h-full"
          width={120}
          height={240}
          alt={product.name}
          src={product.image}
        />
      </div>

      {/* Price Card */}
      <div className="price-card w-[90%] h-[70px] sm:h-[80px] rounded-[10px] sm:rounded-[15px] 
      absolute bottom-3 bg-black/80 backdrop-blur-sm flex flex-col justify-center gap-1 sm:gap-2">
        <div className="px-2 sm:px-3 text-white font-semibold text-xs sm:text-sm truncate">
          {product.name}
        </div>
        <div className="w-full h-[1px] bg-[#dddd]"></div>
        <div className="flex items-center justify-between px-2 sm:px-3">
          <p className="text-white font-medium text-xs">${product.price}</p>
          <div className="flex items-center gap-1">
            <span className="text-white text-[10px] sm:text-xs">({product.rating})</span>
            <TrendingUp className="text-green-400" size={16} />
          </div>
        </div>
      </div>

      {/* Badges */}
      {(product.isNew || product.isBestSeller) && (
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
          {product.isNew && (
            <span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
              Best Seller
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
