"use client";
import React from 'react';
import Image from 'next/image';
import { Link } from 'lucide-react';
import { motion, Variants } from "framer-motion";
import { useActiveLink } from "../context/ActiveLinkContext";
import { Heart, ArrowRight } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            duration: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
        }
    }
};

const BestSellers = () => {
    const { setActiveLink } = useActiveLink();
    return (
        <motion.div
            className="relative w-full overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* Full-width gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-[#ededed]/30 to-[#ededed] -z-10" />

            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-12 md:py-20">
                <div className="flex flex-col md:flex-row md:space-x-12 lg:space-x-24 space-y-8 md:space-y-0 items-center justify-center">
                    {/* Image container */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center rounded-[16px] md:rounded-[20px]
                                  relative before:absolute before:inset-0 before:p-[1.5px] 
                                  before:rounded-[16px] md:before:rounded-[20px] before:bg-gradient-to-tr 
                                  before:from-[#CFAA3D] before:via-[#fee88e] before:to-[#CFAA3D]
                                  after:absolute after:inset-[1.5px] after:rounded-[15px] md:after:rounded-[18px] 
                                  after:bg-gradient-to-br after:from-white after:to-[#fafafa]
                                  w-[220px] sm:w-[260px] md:w-[300px] aspect-square
                                  p-2 sm:p-4 md:p-8 shadow-md">
                        <div className="relative w-full h-full z-10">
                            <Image
                                src="/images/chair.png"
                                alt="Best Seller"
                                fill
                                className="object-contain p-3"
                                sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, 300px"
                            />
                        </div>
                    </motion.div>

                    {/* Content section */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col justify-center space-y-4 w-full md:w-auto px-2">
                        <div className="flex items-start flex-col space-y-2.5">
                            <div className="text-2xl sm:text-2xl md:text-3xl font-semibold tracking-tight">Spa Chair</div>
                            <div className="w-16 sm:w-20 md:w-[150px] h-[1px] bg-gradient-to-r from-[#CFAA3D] via-[#CFAA3D] to-transparent" />
                            <div className="w-full max-w-[260px] sm:w-80 md:w-60 text-sm sm:text-sm md:text-base text-gray-600/90 leading-relaxed">
                                This is a description text for the Spa Chair. It highlights the key features and benefits of this luxurious and comfortable seating option.
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className="font-medium bg-gradient-to-tr from-[#fee88e] to-[#CFAA3D] text-[#111] 
                                     text-sm tracking-wide rounded-full py-2.5 px-5 
                                     flex items-center w-44 sm:w-40 md:w-44 gap-2 mt-2">
                            Discover More
                            <ArrowRight size={16} strokeWidth={2.5} />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default BestSellers;