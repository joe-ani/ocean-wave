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
    <div className="offer flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-20 text-[#333]">
      {/* card 1 */}
      <Card
        imgSrc="/icons/diamond.png"
        text="Fast and Safe delivery."
        cardVariants={cardVariants}
        delay={0}
      />
      {/* card 2 */}
      <Card
        imgSrc="/icons/call.png"
        text="24/7 Customer Support."
        cardVariants={cardVariants}
        delay={0.2}
      />
      {/* card 3 */}
      <Card
        imgSrc="/icons/package.png"
        text="Secure Packaging."
        cardVariants={cardVariants}
        delay={0.4}
      />
    </div>
  );
};

const Card: React.FC<CardProps> = ({ imgSrc, text, cardVariants, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="card w-full md:w-60 h-40 md:h-60 p-3 md:p-3 md:rounded-[30px] bg-gradient-to-r from-[#ededed] to-transparent md:bg-[#ededed] relative md:static flex items-center justify-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      custom={delay}
    >
      <div className="flex flex-row md:flex-col items-center space-x-4 md:space-x-0 md:space-y-4">
        {/* icon */}
        <div className="w-24 h-24 bg-transparent md:bg-[#1111] md:rounded-full flex items-center justify-center">
          <Image width={40} height={40} alt="" src={imgSrc} />
        </div>
        <p className="font-medium text-left md:text-center">{text}</p>
      </div>
    </motion.div>
  );
};

export default Offer;
