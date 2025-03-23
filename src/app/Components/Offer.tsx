"use client";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, Variants } from "framer-motion";

interface CardProps {
  imgSrc: string;
  text: string;
  cardVariants: Variants;
  delay?: number;
}

const Offer: React.FC = () => {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      x: typeof window !== 'undefined' && window.innerWidth < 768 ? -100 : 0,
      y: typeof window !== 'undefined' && window.innerWidth >= 768 ? 100 : 0
    },
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: delay
      }
    })
  };

  return (
    <div className="offer flex flex-col items-center w-full">
      <div className="w-full md:max-w-5xl flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 text-[#333] md:bg-[#ededed] md:px-16 md:py-12 md:rounded-[30px]">
        <Card
          imgSrc="/icons/diamond.png"
          text="Fast and Safe delivery."
          cardVariants={cardVariants}
          delay={0}
        />
        <div className="hidden md:block w-[1px] h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent mx-16" />
        <Card
          imgSrc="/icons/call.png"
          text="24/7 Customer Support."
          cardVariants={cardVariants}
          delay={0.2}
        />
        <div className="hidden md:block w-[1px] h-32 bg-gradient-to-b from-transparent via-gray-400 to-transparent mx-16" />
        <Card
          imgSrc="/icons/package.png"
          text="Secure Packaging."
          cardVariants={cardVariants}
          delay={0.4}
        />
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ imgSrc, text, cardVariants, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="card w-full px-4 md:px-0 md:w-52 h-40 md:h-52 p-3 bg-gradient-to-r from-[#ededed] to-transparent md:bg-transparent flex items-center justify-center group transition-all duration-300 ease-in-out hover:md:-translate-y-2"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      custom={delay}
    >
      <div className="flex flex-row md:flex-col items-center space-x-4 md:space-x-0 md:space-y-4">
        {/* icon container */}
        <div className="relative w-24 h-24 flex items-center justify-center overflow-visible transition-all duration-300 ease-in-out group-hover:md:scale-110">
          <Image
            width={40}
            height={40}
            alt=""
            src={imgSrc}
            className="transition-transform duration-300 ease-in-out group-hover:md:scale-110"
          />
        </div>
        <p className="font-medium text-left md:text-center transition-all duration-300 ease-in-out group-hover:md:font-semibold">{text}</p>
      </div>
    </motion.div>
  );
};

export default Offer;
