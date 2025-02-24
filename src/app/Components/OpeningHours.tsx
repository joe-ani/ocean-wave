import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Map from './Map';

const OpeningHours = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger animation when 20% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and moved down
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }, // Smooth animation
    },
  };

  return (
    <motion.div
      ref={ref}
      className="openin flex flex-row justify-around md:justify-start md:flex-col w-full md:w-[90%] h-auto md:h-[600px] bg-[#EDEDED] rounded-none md:rounded-[30px] py-8 md:py-14 px-4 md:px-20 space-y-10 md:space-y-20"
      variants={sectionVariant}
      initial="hidden"
      animate={controls}
    >

      {/* Timeline UI */}
      <motion.div
        className="opening-time relative flex  flex-col md:flex-row justify-around space-y-4 md:space-y-0"
        variants={sectionVariant}
      >
        <div className="w-[10px] md:w-[15px] h-[10px] md:h-[15px] bg-[#d6b54800] md:hidden rounded-full flex justify-center">
          <div className="h-[86%] w-[2px] rounded-full bg-[#D6B448] absolute top-11 md:hidden"></div>
        </div>

        {[
          { day: "Monday", time: "08:00-13:00" },
          { day: "Tuesday", time: "08:00-13:00" },
          { day: "Wednesday", time: "08:00-13:00" },
          { day: "Thursday", time: "08:00-13:00" },
          { day: "Friday", time: "08:00-13:00" },
          { day: "Saturday", time: "08:00-13:00" },
          { day: "Sunday", time: "Closed", isRed: true }
        ].map((item) => (
          <div key={item.day} className="flex flex-row md:flex-col items-center space-y-2 md:space-y-4 space-x-4 md:space-x-0">
            {/* mobile dot */}
            <div className="w-[10px] md:w-[15px] h-[10px] md:h-[15px] bg-[#D6B448] md:hidden rounded-full"></div>
            <div>
              <div className="text-sm md:text-xl ">{item.day}</div>
              <div className={`text-[11px] md:text-[15px] ${item.isRed ? 'text-red-400' : ''}`}>{item.time}</div>
            </div>
            {/* desktop dot */}
            <div className="w-[10px] md:w-[15px] h-[10px] md:h-[15px] bg-[#D6B448] hidden md:block rounded-full"></div>
          </div>
        ))}
        {/*desktop line */}
        <div className="w-[86%] md:h-[3px] bottom-[6px] rounded-full bg-[#D6B448] absolute"></div>
        {/*mobile line */}
        {/* <div className="h-[90%] w-[2px] rounded-full bg-[#D6B448] absolute md:hidden"></div> */}
      </motion.div>

      <motion.div
        className="relative flex justify-start ml-6 md:justify-center md:ml-0"
        variants={sectionVariant}
      >
        {/* Image mask mobile */}
        <div className="w-[220px] h-[150px] md:w-full md:h-[280px] bg-black rounded-[20px] overflow-hidden md:overscroll-none md:relative">
          {/* Image shop and map */}
          <div className="h-full w-full md:absolute md:w-full">
            {/* Image */}
            <div className="relative h-full w-full">
              <Image
                className="object-cover scale-[1.4] md:scale-100 object-[80%_45%] md:object-center"
                fill
                sizes="(max-width: 768px) 230px, 100vw"
                src="/images/shop.png"
                alt="fugo shop"
                priority
              />
              {/* image fade overlay */}
              <div className="hidden md:block top-0 left-0 w-full h-full absolute rounded-[10px] md:rounded-[30px] bg-gradient-to-r from-black to-transparent"></div>
            </div>
            {/*Map */}
            <div className="absolute flex flex-col top-[170px] md:top-[20%] left-0 md:left-[10%] space-y-2">
              <div className="relative w-[220px] md:w-[250px] border-2 border-[#333333] rounded-lg md:border-0">
                <Map height="130px" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                style={{ backdropFilter: "blur(.2em)" }}
                className="flex space-x-2 md:space-x-4 items-center justify-center w-[220px] md:w-[70%] text-white text-sm bg-[#55555558] rounded-full py-3 md:p-2 border-[1.5px] border-[#fff] md:border-[#5b5b5b]"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=6.456559134970387,3.3842979366622847`)}
              >
                <div className="">Locate Us</div>
                <Image
                  width={20}
                  height={20}
                  src={"/icons/location.png"}
                  alt=""
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OpeningHours;
