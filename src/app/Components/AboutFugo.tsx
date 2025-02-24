"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutFugo = () => {
    return (
        <div className="p-0 sm:p-10 w-full h-auto sm:h-[650px] flex justify-center items-center">
            <motion.div
                className="relative w-full sm:w-[80%] h-[500px] sm:h-[80%] overflow-hidden sm:rounded-[30px]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Image
                    className="w-full h-full object-cover"
                    width={2000}
                    height={600}
                    src={"/images/fugopic.png"}
                    alt={""}
                />
                <div className="absolute w-full h-full bg-gradient-to-b from-black top-0"></div>
                <motion.div
                    className="flex flex-col z-10 absolute top-4 text-white p-6 sm:p-14 space-y-4 sm:space-y-5"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-2xl sm:text-3xl">Ali Ugochicku.</h1>
                    <p className="text-sm sm:text-base font-normal leading-relaxed max-w-[95%] sm:max-w-full">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error, harum.
                    </p>
                </motion.div>
            </motion.div>
            <div className="w-full bg-[#ededed] z-[-10] absolute h-[73%] sm:h-[85%]"></div>
        </div>
    );
};

export default AboutFugo;
