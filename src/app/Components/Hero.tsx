"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { useActiveLink } from "../context/ActiveLinkContext";
import { useRouter } from "next/navigation";

const Hero = () => {
    const { activeLink, setActiveLink } = useActiveLink();
    const listRef = useRef<HTMLLIElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavClick = (link: string) => {
        setActiveLink(link);
        setMenuOpen(false);

        switch (link.toLowerCase()) {
            case 'contact':
                scrollToSection('section7');
                break;
            case 'about':
                scrollToSection('section6');
                break;
            case 'home':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'shop':
                window.location.href = '/shop';
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
    // ---------------------------------

    return (
        <div className="hero bg-[#111111] h-screen flex flex-col justify-center items-center">
            {/* blur layer */}
            <div className="cont1 w-full flex flex-col md:flex-row justify-around items-center px-8 md:px-20 lg:px-40 pb-8 pt-0 md:pt-20">
                {/* hero nav */}
                <div className="logo  md:mb-0 flex justify-between w-full md:w-auto">
                    <Image className="w-32 h-auto md:w-52" width={200} height={100} alt="Dfugo logo" src="/logo.png" />
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
                            <Image width={30} height={30} src="/icons/hamburger.png" alt="menu icon" />
                        </button>
                    </div>
                </div>
                {/* main hero nav */}
                <div className={`flex-col md:flex-row gap-8 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
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
                                        ref={link === "Home" ? listRef : null}
                                        className={`relative cursor-pointer flex flex-col items-center ${activeLink === link ? "text-[#FEEF88]" : ""
                                            }`}
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
                                                className="w-full px-4 py-2 rounded-full bg-[#cccccc21] text-white focus:outline-none"
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
            {/* Header section */}
            <div className="cont2 w-full flex flex-col-reverse md:flex-row justify-around items-center px-8 md:px-20 lg:px-40 pb-10 mb-11 pt-28 mb:pt-0">
                {/* Header texts  */}
                <div className="hero-text text-left pt-28 md:pt-0">
                    <p className="py-3 font-normal text-sm md:text-base">D'Fugo Hair</p>
                    <div className="w-[60%] h-[1px] bg-gradient-to-r from-[#FEEF88] to-transparent rounded-full mx-0"></div>
                    <motion.div
                        variants={heroTextVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-3xl md:text-5xl font-extrabold py-5">
                        <p className="text-[#FEEF88]">Luxury</p> Or Nothing.
                    </motion.div>
                    <div className="w-[60%] h-[1px] bg-gradient-to-r from-[#FEEF88] to-transparent rounded-full mx-0"></div>
                    <p className="pt-8 text-[14px] md:text-[20px] w-[80%] mx-0 font-normal">
                        &quot;We offer all types of premium and high-quality wigs.&quot;
                    </p>
                    <div className="quickact flex space-x-5 md:flex-row space-y-3 md:space-y-0 md:space-x-3 py-4 items-start md:items-center">
                        <Link href={"/shop"} onClick={() => setActiveLink("Shop")}>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="font-medium bg-gradient-to-tr from-[#fee88e] to-[#CFAA3D] text-[#111] text-[14px] md:text-[20px] rounded-full p-2 px-8 flex items-center">
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
                            <div className="bg-[#cccccc5a] h-[2px] w-full rounded-full"></div>
                        </motion.div>
                    </div>
                </div>

                {/* Highlight animation */}
                <motion.div
                    variants={highlightVariants}
                    initial="hidden"
                    animate="visible"
                    className="highlight absolute top-[200px] md:relative md:top-0 w-48 md:w-80 flex items-center justify-center mt-8 md:mt-0">
                    {/* Model */}
                    <motion.div variants={modelImageVariants} className="absolute">
                        <Image width={240} height={160} alt="Dfugo logo" src="/model.png" className="w-52 md:w-auto z-10 relative" />
                        <div className="bg-[#FEEF88] rounded-full w-full h-full absolute top-0"></div>
                        <div className="fade-boundary"></div>
                    </motion.div>
                    {/* highlight container */}
                    <motion.div
                        variants={cardVariants}
                        className="w-[170px] md:w-[200px] highlight-box rounded-[16px] p-[14px] md:p-[20px] md:rounded-[30px] z-10 space-y-2 md:space-y-4 absolute flex flex-col top-[-120px] md:top-[0px]">
                        <div className="flex justify-between items-center relative">
                            <div className="bg-[#fee88e] text-[8px] md:text-[14px] text-black font-semibold rounded-full p-1 px-3 md:px-5">Featured</div>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 md:p-4 rounded-full relative flex items-center justify-center cursor-pointer hover:bg-[#cccccc28]">
                                <Image className="absolute w-3 md:w-4" width={16} height={16} src={"/icons/arrowwhite.png"} alt="" />
                            </motion.div>
                        </div>
                        <div className="flex flex-col space-y-1.5 md:space-y-3">
                            <h1 className="text-[8px] md:text[16px]">Our best sellers</h1>
                            <div className="w-[100%] h-[1px] bg-[#ccc] rounded-full"></div>
                        </div>
                        <div className="flex bg-[#cccccc39] p-[6px] md:p-[10px] rounded-[8px]">
                            <Image width={24} height={16} src={"/images/wig1.png"} alt="" className="w-4 md:w-6" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* scroll button */}
            <Link className="absolute bottom-10" href={"#section1"}>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-14 md:h-14 border-[#feef88] border md:border-2 rounded-full cursor-pointer flex items-center justify-center">
                    <Image width={20} height={20} alt="arrow down" src="/icons/drop.png" />
                </motion.div>
            </Link>
        </div>
    );
};

export default Hero;
