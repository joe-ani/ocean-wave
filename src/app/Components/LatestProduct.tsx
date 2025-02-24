"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import productData from "../latestProductData"; // Import Product interface
import Link from "next/link";
import { useActiveLink } from "../context/ActiveLinkContext";
import { Heart, TrendingUp, ArrowRight } from "lucide-react";

// Remove the local Product interface since we're importing it

const LatestProduct: React.FC = () => {
  const [likeColour] = useState({ on: "#ff0000", off: "#ffffff" });

  const toggleLike = (index: number) => {
    const updatedProducts = productData.map((product, i) => {
      if (i === index) {
        return { ...product, likeStatus: !product.likeStatus };
      }
      return product;
    });
    // Update the productData array with the new values
    updatedProducts.forEach((product, i) => {
      productData[i] = product;
    });
  };

  // Updated animation variants
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      },
      boxShadow: "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)"
    },
    tap: {
      scale: 0.98,
      boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  return (
    <div className="latest-product-container flex flex-col items-center space-y-12">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {productData.map((product, index) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.2,
            rootMargin: "50px"
          });

          return (
            <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
              <motion.div
                ref={ref}
                className="latest-product-card w-[150px] h-[200px] sm:w-[200px] sm:h-[250px] flex flex-col items-center p-4 bg-slate-200 relative rounded-[15px] sm:rounded-[25px] cursor-pointer transition-colors duration-200"
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
                    toggleLike(index);
                  }}
                  className="absolute right-4 top-4 z-10 p-2 cursor-pointer hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`stroke-none`}
                    fill={product.likeStatus ? likeColour.on : likeColour.off}
                    size={36}
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
                    src={product.img}
                  />
                </div>

                {/* Price Card */}
                <div className="price-card w-[90%] h-[60px] sm:h-[80px] rounded-[10px] sm:rounded-[15px] absolute bottom-4 flex flex-col justify-center space-y-2">
                  <div className="px-[10px] text-white font-semibold text-sm sm:text-base">{product.name}</div>
                  <div className="w-[100%] h-[1px] bg-[#dddd]"></div>
                  <div className="flex items-center justify-between px-[10px]">
                    <p className="text-white font-medium text-xs sm:text-sm">{product.price}k</p>
                    <TrendingUp className="text-white" size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Shop button */}
      <Link href={"/shop"} onClick={() => useActiveLink().setActiveLink("Shop")}>
        <motion.button
          whileHover={{
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{
            scale: 0.95,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          className="font-medium bg-gradient-to-tr from-[#fee88e] to-[#CFAA3D] text-[#111] text-base sm:text-[20px] rounded-full p-2 px-8 flex items-center gap-2"
        >
          Shop
          <ArrowRight size={20} />
        </motion.button>
      </Link>
    </div>
  );
};

export default LatestProduct;
