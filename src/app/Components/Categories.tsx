import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Hook to track when items are in view
import { useRouter } from "next/navigation";
import { CATEGORIES } from '@/data/categories';

// Update interface to include category id
interface CategoryItemProps {
    imageSrc: string;
    label: string;
    categoryId: string;
}

const Categories = () => {
    return (
        <div className="categories grid grid-cols-2 md:grid-cols-3 gap-20 sm:gap-12 md:gap-28 p-8 sm:p-6 md:px-8">
            {CATEGORIES.map((category) => (
                <CategoryItem 
                    key={category.id}
                    imageSrc={category.imageSrc}
                    label={category.name}
                    categoryId={category.id}
                />
            ))}
        </div>
    );
};

const CategoryItem: React.FC<CategoryItemProps> = ({ imageSrc, label, categoryId }) => {
    const router = useRouter();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: "50px",
    });

    const handleCategoryClick = () => {
        router.push(`/shop?category=${categoryId}`);
    };

    return (
        <motion.div
            ref={ref}
            onClick={handleCategoryClick}
            variants={{
                hidden: { opacity: 0, y: 15 }, // Reduced initial offset
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.4, // Reduced duration
                        ease: "easeOut",
                    },
                },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
                delay: 0.1, // Reduced delay
            }}
            className="flex flex-col items-center space-y-3 sm:space-y-4 cursor-pointer"
        >
            <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px]"
            >
                <Image 
                    className="rounded-full object-cover"
                    src={imageSrc}
                    alt={label}
                    fill
                />
            </motion.div>
            <div className="text-center text-sm sm:text-base-sm mt-2">{label}</div>
        </motion.div>
    );
};

export default Categories;
