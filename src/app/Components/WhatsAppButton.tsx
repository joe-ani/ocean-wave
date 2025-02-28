"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const WhatsAppButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const openWhatsApp = () => {
        if (!isMounted || typeof window === 'undefined') return;

        if (message.trim() !== "") {
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/2347016027618?text=${encodedMessage}`;
            window?.open(whatsappURL, "_blank");
        } else {
            alert("Please enter a message.");
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.75,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 0.5,
                bounce: 0.3
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 10,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-bl from-[#fee88e] to-[#CFAA3D] w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full fixed top-[80%] md:top-[70%] right-5 md:right-10 flex items-center justify-center shadow-lg cursor-pointer z-[9999]"
            >
                <Image width={35} height={35} className="w-[42%] md:w-[60%]" src={"/icons/message.png"} alt={"message"} />
            </motion.div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            ref={modalRef}
                            className="bg-white rounded-lg w-[90%] max-w-md p-4 sm:p-6 shadow-lg relative"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-black text-sm"
                            >
                                ✕
                            </button>
                            <h2 className="text-base sm:text-xl font-[700] mb-3 sm:mb-4 text-center text-[#333333]">Send a WhatsApp Message</h2>
                            <textarea
                                className="text-[#333] text-sm w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#CFAA3D] resize-none"
                                rows={4}
                                placeholder="Type your message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                onClick={openWhatsApp}
                                className="mt-3 sm:mt-4 w-full bg-gradient-to-bl from-[#fee88e] to-[#CFAA3D] text-white py-2 text-sm sm:text-base rounded-md shadow-md hover:scale-105 transition-transform"
                            >
                                Send on WhatsApp
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WhatsAppButton;