"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useActiveLink } from "../context/ActiveLinkContext";

const Nav = () => {
  const { activeLink, setActiveLink } = useActiveLink();
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname(); // Get the current route
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPosition = window?.scrollY;
      setIsVisible(scrollPosition > 300); // Show the navbar after scrolling 300px
    };

    if (pathname === "/") {
      // Add scroll event listener for the home page
      setIsVisible(false); // Initially hide the navbar
      window?.addEventListener("scroll", handleScroll);
      return () => window?.removeEventListener("scroll", handleScroll);
    } else {
      setIsVisible(true); // Show the navbar immediately for other pages
    }

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isMounted]);

  // Add this useEffect to sync activeLink with current pathname
  useEffect(() => {
    if (pathname === '/shop') {
      setActiveLink('Shop');
    } else if (pathname === '/') {
      setActiveLink('Home');
    }
  }, [pathname, setActiveLink]);

  const scrollToSection = (sectionId: string) => {
    if (!isMounted || typeof window === 'undefined') return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (link: string) => {
    setActiveLink(link);
    setIsMenuOpen(false);

    if (pathname === '/') {
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
          router.push('/shop');
          break;
      }
    } else {
      if (link.toLowerCase() === 'home') {
        router.push('/');
      } else {
        router.push(`/${link.toLowerCase()}`);
      }
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

  // Add these variants for the mobile menu animations
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

  // Add useEffect for click away listener
  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menu = document.getElementById('mobile-menu');
      const hamburger = document.getElementById('hamburger-button');

      if (menu && hamburger &&
        !menu.contains(target) &&
        !hamburger.contains(target) &&
        isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 w-full z-[100] bg-[#111111] text-white p-6 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Overlay with fade effect */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo - adjusted size */}
          <Link href={"/"}>
            <Image src="/logo.png" alt="Logo" width={100} height={50} />
          </Link>

          <div className="flex items-center space-x-8">
            {/* Nav items - adjusted spacing */}
            <motion.ul
              animate={{ opacity: showSearch ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className={`list-none hidden md:flex items-center space-x-8 font-medium ${showSearch ? 'invisible' : 'visible'}`}
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
                      transition={{ duration: 0.2 }}
                    ></motion.div>
                  )}
                </li>
              ))}
            </motion.ul>

            {/* Search container - adjusted sizing */}
            <div className="relative flex items-center z-[101]">
              <button
                type="button"
                className="rounded-full p-3 cursor-pointer hover:bg-[#cccccc21] hidden md:flex items-center justify-center relative z-[102]"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Image
                  className="object-contain pointer-events-none"
                  width={16}
                  height={20}
                  src={"/icons/search2.png"}
                  alt={"search icon"}
                />
              </button>

              {/* Inline search bar - adjusted size */}
              {showSearch && (
                <motion.form
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "240px" }}
                  exit={{ opacity: 0, width: 0 }}
                  onSubmit={handleSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 rounded-full bg-[#cccccc21] text-white focus:outline-none"
                      placeholder="Search products..."
                      autoFocus
                    />
                  </div>
                </motion.form>
              )}
            </div>

            {/* Mobile menu button - adjusted size */}
            <div className="md:hidden flex items-center">
              <button
                id="hamburger-button"
                className="text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.svg
                  animate={isMenuOpen ? "open" : "closed"}
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
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                  />
                </motion.svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          id="mobile-menu"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.1
              }
            },
            closed: {
              opacity: 0,
              y: "-100%",
              transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                staggerChildren: 0.05,
                staggerDirection: -1
              }
            }
          }}
          className="fixed top-0 left-0 w-full bg-[#111111] z-40 md:hidden"
        >
          {/* Mobile Header */}
          <div className="flex justify-between items-center px-8 pt-6 pb-4 border-b border-[#ffffff20]">
            <Link href={"/"}>
              <Image src="/logo.png" alt="Logo" width={100} height={50} />
            </Link>
            <button
              className="text-white focus:outline-none p-2"
              onClick={() => setIsMenuOpen(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="pt-8 pb-8 px-8 flex flex-col items-center gap-8">
            {/* Mobile Search */}
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
                className="w-full px-6 py-3 rounded-full bg-[#ffffff10] text-white focus:outline-none focus:ring-2 focus:ring-[#FEEF88] transition-all text-center"
                placeholder="Search products..."
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2"
              >
                <Image width={16} height={16} src="/icons/search2.png" alt="search" />
              </button>
            </motion.form>

            {/* Navigation Links */}
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
      </div>
    </nav>
  );
};

export default Nav;