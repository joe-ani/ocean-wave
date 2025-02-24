"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import productData from '../../latestProductData';
import Image from 'next/image';
import { Heart, ArrowLeft, TrendingUp } from "lucide-react";
import Footer from '../../Components/Footer';
import Skeleton from '@/src/components/Skeleton';
import { motion } from 'framer-motion';

interface ProductType {
    name: string;
    price: string | number;
    img: string;
    height?: string;
    // add other properties as needed
}

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        try {
            const savedProduct = localStorage.getItem('selectedProduct');
            if (savedProduct) {
                setProduct(JSON.parse(savedProduct));
            } else {
                // Fix type safety for slug parameter
                const slug = typeof params?.slug === 'string' ? params.slug : '';
                const fallbackProduct = productData.find(
                    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
                );
                if (fallbackProduct) {
                    setProduct(fallbackProduct);
                }
            }
        } catch (error) {
            console.error('Error loading product:', error);
        }
    }, [params?.slug]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#333333] p-4 pt-32 sm:pt-44">
                <div className="w-full max-w-6xl">
                    {/* Header Skeleton */}
                    <div className="flex items-center justify-between mb-6">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-[300px] h-[100px] rounded-lg" />
                        <div></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Image Skeleton */}
                        <div className="relative w-full flex items-center justify-center">
                            <Skeleton className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-[30px]" />
                        </div>

                        {/* Details Skeleton */}
                        <div className="flex flex-col justify-center space-y-4">
                            <Skeleton className="w-3/4 h-8 rounded-lg" />
                            <Skeleton className="w-1/2 h-6 rounded-lg" />
                            <Skeleton className="w-1/3 h-12 rounded-full mt-6" />
                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent my-6" />
                            <Skeleton className="w-full h-12 rounded-md" />
                            <Skeleton className="w-full h-12 rounded-md" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#333333] p-4 pt-32 sm:pt-44">
                <div className="w-full max-w-6xl">
                    <div className="flex items-center justify-between mb-6 mt-4 sm:mt-0">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="cursor-pointer p-2"
                        >
                            <ArrowLeft
                                className="text-yellow-500 w-6 h-6 sm:w-8 sm:h-8"
                                onClick={() => router.back()}
                            />
                        </motion.div>
                        <Image
                            width={300}
                            height={100}
                            src={"/icons/luxury.png"}
                            alt={"luxury"}
                            className="w-[180px] sm:w-[300px]"
                        />
                        <div className="w-6 sm:w-8"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-10">
                        {/* Product Image Section */}
                        <div className="relative w-full flex items-center justify-center">
                            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-[20px] sm:rounded-[30px] 
                            flex items-center justify-center bg-gradient-to-t border-2 border-[#A4A4A4] from-[#A4A4A4] to-white 
                            overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        src={product.img || '/placeholder-image.jpg'}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 sm:p-8"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority
                                    />
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 cursor-pointer z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsLiked(!isLiked);
                                    }}
                                >
                                    <Heart
                                        className={`w-6 h-6 sm:w-7 sm:h-7 stroke-[1.5] ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                                        fill={isLiked ? "#ef4444" : "none"}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="flex flex-col justify-center px-2 sm:px-4">
                            <h2 className="text-2xl sm:text-3xl font-bold">{product.name}</h2>
                            {product.height && <p className="text-lg sm:text-xl text-gray-600 mt-2">{product.height}</p>}

                            <div className="flex gap-4 mt-4 sm:mt-6">
                                <div className="px-4 sm:px-6 py-2 sm:py-3 bg-[#333333] text-white rounded-full 
                                flex items-center gap-2 text-base sm:text-lg">
                                    {product.price}k <TrendingUp size={16} className="sm:w-5 sm:h-5" />
                                </div>
                            </div>

                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent my-6" />

                            <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-[#333333] text-white py-3 px-6 rounded-md hover:opacity-90 
                                    transition-opacity text-base sm:text-lg"
                                >
                                    Order Now
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-[#333333] text-white py-3 px-6 rounded-md hover:opacity-90 
                                    transition-opacity text-base sm:text-lg"
                                    onClick={() => router.push('/contact')}
                                >
                                    Locate Us
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
