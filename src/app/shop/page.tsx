"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { useSearchParams } from 'next/navigation';
import { CATEGORIES, Category } from '@/data/categories';
import { COLORS } from '@/data/colors';

const page = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams.get('search') || "";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const categoryFilter = searchParams.get('category');
  const [activeColor, setActiveColor] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = !activeCategory || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesColor = !activeColor || product.color === activeColor;
      return matchesCategory && matchesSearch && matchesColor;
    });
  }, [activeCategory, searchQuery, activeColor]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const url = new URL(window.location.href);
    url.searchParams.set('search', searchQuery);
    window.history.pushState({}, '', url);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="text-black p-3 sm:p-10 pt-40 sm:pt-52 flex flex-col justify-center items-center">
      <div className="flex w-full justify-center relative mt-6 sm:mt-2">
        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-32 sm:top-40 left-4 sm:left-6 cursor-pointer bg-white/10 backdrop-blur-sm 
          w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full flex items-center justify-center 
          hover:bg-white/20 z-50"
          onClick={() => window.history.back()}
        >
          <Image
            width={24}
            height={24}
            src={"/icons/arrowback.png"}
            alt={"back"}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </motion.div>
        <Image
          width={300}
          height={100}
          src={"/icons/luxury.png"}
          alt={"luxury"}
          className="w-[200px] sm:w-[300px]"
        />
      </div>

      {/* Search and Filter Inputs */}
      <div className="w-full max-w-4xl mt-4 sm:mt-8 flex flex-col sm:flex-row justify-between items-center 
      gap-2 sm:gap-6 px-2 sm:px-4 md:px-8">
        <form onSubmit={handleSearch} className="relative flex-1 w-full">
          <Image
            width={20}
            height={20}
            src="/icons/search.png"
            alt="search"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-40 transition-opacity group-hover:opacity-60"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 backdrop-blur-sm border-[1.5px] border-gray-200 
            rounded-full focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-gray-300 
            transition-all duration-300 shadow-sm hover:shadow-md"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        <motion.div
          className="relative w-full sm:min-w-[180px] sm:w-auto"
          initial={false}
        >
          <motion.select
            className="appearance-none w-full h-[50px] px-5 bg-gray-50/50 backdrop-blur-sm border-[1.5px] 
            border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-black/20 
            focus:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md 
            cursor-pointer text-gray-700 pr-14 leading-[50px]"
            onChange={(e) => {
              const select = e.currentTarget;
              select.style.transform = 'scale(0.98)';
              setTimeout(() => select.style.transform = '', 150);
            }}
            onFocus={() => setIsFilterOpen(true)}
            onBlur={() => setIsFilterOpen(false)}
          >
            <option value="" className="h-10 leading-10">Filter By</option>
            <option value="price-low" className="h-10 leading-10">Price: Low to High</option>
            <option value="price-high" className="h-10 leading-10">Price: High to Low</option>
            <option value="newest" className="h-10 leading-10">Newest First</option>
            <option value="popular" className="h-10 leading-10">Most Popular</option>
          </motion.select>
          <motion.div
            className="absolute right-5 top-0 h-full flex items-center justify-center pointer-events-none"
            initial={{ rotate: 0 }}
            animate={{ rotate: isFilterOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              width={20}
              height={20}
              src="/icons/dropdown.png"
              alt="dropdown"
              className="w-5 h-5 object-contain"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Category Filters */}
      <div className="w-full max-w-4xl mt-4 sm:mt-8 px-2 sm:px-4 md:px-8">
        <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-4">Categories</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-3">
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className={`cursor-pointer p-2 sm:p-3 rounded-lg text-center transition-colors duration-200
                ${activeCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              <div className="text-lg sm:text-2xl">{category.icon}</div>
              <div className="text-[10px] sm:text-sm font-medium mt-0.5 sm:mt-1">{category.name}</div>
            </motion.div>
          ))}
        </div>

        {/* Color Pills */}
        <div className="mt-3 sm:mt-6">
          <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-gray-600">By Color</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {COLORS.map((color) => (
              <motion.button
                key={color.id}
                onClick={() => setActiveColor(activeColor === color.id ? null : color.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium 
                transition-all duration-200
                  ${activeColor === color.id
                    ? 'ring-1 sm:ring-2 ring-black ring-offset-1'
                    : 'hover:ring-1 hover:ring-gray-300'
                  }
                  ${color.id === 'mixed'
                    ? 'bg-gradient-to-r from-pink-300 via-purple-300 via-blue-300 via-green-300 via-yellow-300 to-red-300 text-black'
                    : ''
                  }
                `}
                style={{
                  backgroundColor: color.id !== 'mixed' ? color.hex : undefined,
                  color: ['black', 'burgundy', 'brown'].includes(color.id) ? 'white' : 'black',
                }}
              >
                {color.name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center py-8 sm:py-20"
        >
          <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🔍</div>
          <h3 className="text-lg sm:text-2xl font-semibold mb-1 sm:mb-2">No products found</h3>
          <p className="text-gray-600 text-xs sm:text-base">
            We couldn't find any products matching your search.
            <br />
            Try using different keywords or browsing our categories.
          </p>
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="w-full max-w-7xl mt-8 sm:mt-12 px-2 sm:px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6 place-items-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-black/80 hover:bg-black text-white w-10 h-10 
          rounded-full flex items-center justify-center shadow-lg cursor-pointer backdrop-blur-sm
          transition-all duration-300 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default page;