"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const ContactForm = () => {
    return (
        <div className="flex flex-col md:flex-row justify-around relative bg-gradient-to-b from-[#ededed] to-transparent p-4 md:p-10">
            {/* WhatsApp Section */}
            <motion.div
                className="flex flex-col p-4 md:p-20 space-y-4 md:space-y-14"
                initial={{ x: -100, opacity: 0 }} // Initial state: slide in from the left and invisible
                whileInView={{ x: 0, opacity: 1 }} // Animate to: slide to position and become visible
                transition={{ duration: 0.6 }} // Animation duration
                viewport={{ once: true }} // Trigger animation only once
            >
                <div className="flex flex-col">
                    <div className="font-medium text-xs md:text-base text-black">Send us a.</div>
                    <div className="text-lg md:text-2xl text-black">Whatsapp Message</div>
                </div>
            
                <motion.div
                    className="w-full md:w-[550px] h-[80px] md:h-[150px] bg-[#d4d4d4] border-2 border-white rounded-[10px] md:rounded-[20px] relative flex flex-col justify-end p-3 md:p-4"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center w-full">
                        <input
                            type="text"
                            className="w-full bg-transparent border-none outline-none text-black placeholder-black text-xs md:text-base font-thin"
                            placeholder="Type your message..."
                        />
                        <motion.div 
                            className="ml-2 cursor-pointer"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image className="object-contain w-6 md:w-8" width={32} height={32} src="/icons/share.png" alt="send" />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Social Media Section */}
            <motion.div
                className="flex flex-col p-4 md:p-20 space-y-4 md:space-y-14"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }} // Animation duration
                viewport={{ once: true }} // Trigger animation only once
            >
                <div className="flex flex-col">
                    <div className="font-medium text-xs md:text-base text-black">Follow us via.</div>
                    <div className="text-lg md:text-2xl text-black">Our Social Media</div>
                </div>

                <motion.div
                    className="w-full md:w-[350px] h-[180px] md:h-[250px] bg-[#d4d4d4] border-2 border-white rounded-[10px] md:rounded-[20px] p-3 md:p-6 space-y-3 md:space-y-6"
                    initial={{ scale: 0.9, opacity: 0 }} // Initial state: slightly smaller and invisible
                    whileInView={{ scale: 1, opacity: 1 }} // Animate to: full size and visible
                    transition={{ duration: 0.6, delay: 0.3 }} // Animation duration with delay
                    viewport={{ once: true }} // Trigger animation only once
                >
                    {/* instagram */}
                    <div className="flex items-center space-x-2 md:space-x-4 hover:bg-[#d3d3d3] p-2 rounded transition-colors duration-300">
                        <Image className="object-contain w-4 md:w-5" width={20} height={20} src="/icons/instagram.png" alt="instagram" />
                        <div className="font-normal text-xs md:text-base">@d_fugo_hair</div>
                    </div>
                    <motion.div className="w-full h-[1px] bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}></motion.div>
                    {/* tiktok */}
                    <div className="flex items-center space-x-2 md:space-x-4 hover:bg-[#d3d3d3] p-2 rounded transition-colors duration-300">
                        <Image className="object-contain w-4 md:w-5" width={20} height={20} src="/icons/tiktok.png" alt="tiktok" />
                        <div className="font-normal text-xs md:text-base">@d_fugo_hair</div>
                    </div>
                    <motion.div className="w-full h-[1px] bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}></motion.div>
                    {/* whatsapp */}
                    <div className="flex items-center space-x-2 md:space-x-4 hover:bg-[#d3d3d3] p-2 rounded transition-colors duration-300">
                        <Image className="object-contain w-4 md:w-5" width={20} height={20} src="/icons/whatsapp.png" alt="whatsapp" />
                        <div className="font-normal text-xs md:text-base">@d_fugo_hair</div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ContactForm;