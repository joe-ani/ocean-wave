"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { useActiveLink } from "../context/ActiveLinkContext";
import { useRouter } from "next/navigation";

const Hero = () => {
    const { activeLink, setActiveLink } = useActiveLink();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const dropIconRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const [isOverlapping, setIsOverlapping] = useState(false);
    const [currentModelIndex, setCurrentModelIndex] = useState(0);

    // Array of model images
    const modelImages = [
        "hero-graphis/hero1.png",
        "hero-graphis/facemask model5.png",
        // Add more model image paths as needed
    ];

    // Image rotation effect
    useEffect(() => {
        if (!isMounted) return;

        const interval = setInterval(() => {
            setCurrentModelIndex((prevIndex) =>
                prevIndex === modelImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Changed to 4 seconds for each image display

        return () => clearInterval(interval);
    }, [isMounted, modelImages.length]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const scrollToSection = (sectionId: string) => {
        if (!isMounted || typeof window === 'undefined') return;
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavClick = (link: string) => {
        setActiveLink(link);
        setMenuOpen(false);

        if (!isMounted || typeof window === 'undefined') return;

        switch (link.toLowerCase()) {
            case 'contact':
                scrollToSection('section7');
                break;
            case 'about':
                scrollToSection('section6');
                break;
            case 'home':
                window?.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'shop':
                router.push('/shop');
                break;
        }
    };

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        }
        setShowSearch(false);
        setSearchQuery("");
    };

    const checkOverlap = useCallback(() => {
        if (!isMounted || typeof window === 'undefined') return;

        const dropIcon = dropIconRef.current;
        const actions = actionsRef.current;

        if (dropIcon && actions && window.innerWidth < 768) { // Only check on mobile
            const dropRect = dropIcon.getBoundingClientRect();
            const actionsRect = actions.getBoundingClientRect();

            // Check if the drop icon overlaps with the actions section
            const isOverlapping = !(
                dropRect.top > actionsRect.bottom ||
                dropRect.bottom < actionsRect.top
            );

            setIsOverlapping(isOverlapping);
        }
    }, [isMounted]);

    useEffect(() => {
        if (!isMounted || typeof window === 'undefined') return;

        checkOverlap();
        window.addEventListener('resize', checkOverlap);
        window.addEventListener('scroll', checkOverlap);

        return () => {
            window.removeEventListener('resize', checkOverlap);
            window.removeEventListener('scroll', checkOverlap);
        };
    }, [checkOverlap, isMounted]);

    // framer motion variants --------
    const heroTextVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    const highlightVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.3, // Delay for smoother stagger
            },
        },
    };

    const modelImageVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: "easeOut", delay: 0.6 },
        },
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }
        }
    };

    const menuItemVariants = {
        closed: { opacity: 0, y: -20 },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
            }
        })
    };

    // Animation variants for the model image
    const slideUpVariants = {
        enter: {
            // y: 100,
            opacity: 0
        },
        center: {
            y: 0,
            opacity: 1,
            transition: {
                y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
            }
        },
        exit: {
            // y: -100,
            opacity: 0,
            transition: {
                y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
            }
        }
    };

    return (
        <div className="hero bg-[#111111] h-screen w-screen flex flex-col justify-center items-center">
            {/* Updated Overlay with blur effect */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <div className="container mx-auto max-w-[1536px] flex flex-col md:flex-row justify-around items-center px-8 md:px-20 lg:px-40 pb-8 pt-0 md:pt-20">
                <div className="logo md:mb-0 flex pt-16 md:pt-14 justify-between w-full md:w-auto items-center relative z-50">
                    <Image
                        className="w-17 h-auto md:w-32"
                        width={70}
                        height={70}
                        priority
                        alt="Dfugo logo"
                        src="/logo.png"
                    />

                    {/* Nav-style Hamburger Button */}
                    <button
                        className="text-white md:hidden focus:outline-none z-50 p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Updated Mobile Menu with centered items and dots */}
                <motion.div
                    initial="closed"
                    animate={menuOpen ? "open" : "closed"}
                    variants={mobileMenuVariants}
                    className="fixed top-0 left-0 w-full bg-[#111111] z-40 md:hidden"
                >
                    <div className="pt-32 pb-8 px-8 flex flex-col items-center gap-8">
                        {/* Mobile Search - Centered */}
                        <motion.form
                            variants={menuItemVariants}
                            custom={0}
                            className="relative w-full max-w-[280px]"
                            onSubmit={handleSearch}
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-3 rounded-full bg-[#ffffff10] text-white focus:outline-none focus:ring-2 focus:ring-[#FEEF88] transition-all text-left" // Changed text-center to text-left
                                placeholder="Search products..."
                            />
                            <button
                                type="submit"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2"
                            >
                                <Image width={16} height={16} src="/icons/search2.png" alt="search" />
                            </button>
                        </motion.form>

                        {/* Navigation Links - Centered with dots */}
                        <div className="flex flex-col items-center gap-8 w-full">
                            {["Home", "Shop", "Contact", "About"].map((link, i) => (
                                <motion.div
                                    key={link}
                                    variants={menuItemVariants}
                                    custom={i + 1}
                                    className="relative flex flex-col items-center"
                                >
                                    <button
                                        onClick={() => handleNavClick(link)}
                                        className={`text-center text-lg font-medium py-2 px-4 ${activeLink === link ? "text-[#FEEF88]" : "text-white"
                                            }`}
                                    >
                                        {link}
                                    </button>
                                    {activeLink === link && (
                                        <motion.div
                                            className="absolute -bottom-2 bg-[#fee88e] w-[6px] h-[6px] rounded-full"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex">
                    <div className="flex flex-col items-center">
                        {/* Nav items and search container */}
                        <div className="flex items-center space-x-8 relative">
                            <motion.ul
                                animate={{ opacity: showSearch ? 0 : 1 }}
                                transition={{ duration: 0.2 }}
                                className={`list-none flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 font-medium ${showSearch ? 'invisible' : 'visible'
                                    }`}
                            >
                                {["Home", "Shop", "Contact", "About"].map((link) => (
                                    <li
                                        key={link}
                                        className={`relative cursor-pointer flex flex-col items-center ${activeLink === link ? "text-[#FEEF88]" : ""}`}
                                        onClick={() => handleNavClick(link)}
                                    >
                                        <div>{link}</div>
                                        {activeLink === link && (
                                            <motion.div
                                                className="absolute top-8 bg-[#fee88e] w-[10px] h-[10px] rounded-full"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.2 }} // Reduced from 0.3 to 0.2
                                            ></motion.div>
                                        )}
                                    </li>
                                ))}
                            </motion.ul>

                            {/* Search container */}
                            <div className="relative flex items-center">
                                <div
                                    className="rounded-full p-3 cursor-pointer hover:bg-[#cccccc21] hidden md:block"
                                    onClick={() => setShowSearch(!showSearch)}
                                >
                                    <Image
                                        className="object-contain"
                                        width={16}
                                        height={20}
                                        src={"/icons/search2.png"}
                                        alt={"search icon"}
                                    />
                                </div>

                                {/* Inline search bar */}
                                {showSearch && (
                                    <motion.form
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "240px" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        onSubmit={handleSearch}
                                        className="absolute right-12"
                                    >
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full px-4 py-2 rounded-full bg-[#cccccc21] text-white focus:outline-none text-left" // Changed text-center to text-left
                                                placeholder="Search products..."
                                                autoFocus
                                                onBlur={() => !searchQuery && setShowSearch(false)}
                                            />
                                        </div>
                                    </motion.form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section - Original styling */}
            <div className="cont2 w-full flex flex-col-reverse md:flex-row justify-around items-center px-8 md:px-20 lg:px-40 pb-10 mb-11 pt-28 mb:pt-0">
                {/* Hero Text Section - Original styling */}
                <div className="hero-text text-left pt-44 md:pt-0">
                    <p className="py-3 font-normal text-sm md:text-base">Ocean Wave beauty hub</p>

                    <div className="w-[60%] h-[1px] bg-gradient-to-r from-[#FEEF88] to-transparent rounded-full mx-0"></div>
                    <motion.div
                        variants={heroTextVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl md:text-5xl font-extrabold py-5">
                        {/* imlement modern text by text animation using framer */}
                        <p>where innovation</p>
                        <div className="flex gap-2">
                            <span className="bg-gradient-to-r from-[#CBA335] to-[#FEEF88] bg-clip-text text-transparent">meets Beauty.</span>
                        </div>
                    </motion.div>
                    <div className="w-[60%] h-[1px] bg-gradient-to-r from-[#FEEF88] to-transparent rounded-full mx-0"></div>
                    <p className="pt-8 text-[14px] md:text-[20px] w-[80%] mx-0 font-normal">
                        &quot;we offer all types of high quality salon, spa, and beauty equipments.&quot;
                    </p>
                    <div ref={actionsRef} className="quickact flex space-x-5 md:flex-row space-y-3 md:space-y-0 md:space-x-3 py-4 items-start md:items-center">
                        <Link href={"/shop"} onClick={() => setActiveLink("Shop")}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="font-medium bg-gradient-to-tr from-[#fee88e] to-[#CBA335] text-[#111] text-[14px] md:text-[20px] rounded-full p-2 px-8 flex items-center">
                                Shop
                                <Image width={20} height={20} alt="arrow down" src="/icons/arrow.png" />
                            </motion.button>
                        </Link>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex flex-col relative cursor-pointer"
                            onClick={() => scrollToSection('section3')}>
                            <div className="font-medium text-sm md:text-base">Locate Us</div>
                            <div className="bg-gradient-to-r from-transparent via-[#cccccc5a] to-transparent h-[2px] w-full rounded-full"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Highlight Section - Original position */}
                <motion.div
                    variants={highlightVariants}
                    initial="hidden"
                    animate="visible"
                    className="highlight absolute top-[200px] md:relative md:top-0 w-48 md:w-80 flex items-center justify-center mt-8 md:mt-0">
                    {/* Model */}
                    <motion.div variants={modelImageVariants} className="absolute w-52 md:w-auto">
                        {/* Fixed background circle */}
                        {/* <div className="bg-gradient-to-b from-[#FEEF88] to-transparent rounded-full w-full h-full absolute top-0"></div> */}

                        {/* Animated model image */}
                        {/* problem: Two images on top of each other during entrance and exit causing the styling to stretch the bg circle and offset the current image ot of position */}
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentModelIndex}
                                variants={slideUpVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="relative z-10"
                            >
                                <Image
                                    width={240}
                                    height={160}
                                    alt={`Model ${currentModelIndex + 1}`}
                                    src={modelImages[currentModelIndex]}
                                    className="w-52 md:w-auto z-10 relative"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="fade-boundary"></div>
                    </motion.div>

                    {/* Highlight container */}
                    <motion.div
                        variants={cardVariants}
                        className="w-[170px] md:w-[200px] highlight-box border-[1.5px] border-[#feef88] rounded-[20px] p-[14px] md:p-[20px] md:rounded-[30px] z-10 space-y-2 md:space-y-4 absolute flex flex-col top-[-120px] md:top-[0px]">
                        <div className="flex justify-between items-center relative">
                            <div className="bg-[#d1d1d171] text-[8px] md:text-[14px] text-white font-semibold rounded-full p-1 px-3 md:px-5">Featured</div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 md:p-4 rounded-full relative flex items-center justify-center cursor-pointer hover:bg-[#cccccc28]">
                                <Image className="absolute w-3 md:w-4" width={16} height={16} src={"/icons/arrowwhite.png"} alt="" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between space-y-1.5 md:space-y-3">
                            <h1 className="text-[14px] w-[5%] md:text[16px]">LED face mask</h1>
                            <div className="flex w-[60%] h-[60px] border-1 border-gray-500 bg-[#cccccc39] p-[6px] md:p-[10px] rounded-[8px]">
                                {/* <Image width={24} height={16} src={"/images/wig1.png"} alt="" className="w-4 md:w-6" /> */}
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Updated Scroll Button with visibility control */}
            <div className={`absolute bottom-10 transition-opacity duration-300 ${isOverlapping ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <Link href={"#section1"}>
                    <motion.div
                        ref={dropIconRef}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 md:w-14 md:h-14 border-[#feef88] border md:border-2 rounded-full cursor-pointer flex items-center justify-center"
                    >
                        <Image width={20} height={20} alt="arrow down" src="/icons/drop.png" />
                    </motion.div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
