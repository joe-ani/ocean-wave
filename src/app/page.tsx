"use client"

import Image from "next/image";
import Hero from "./Components/Hero";
import Offer from "./Components/Offer";
import LatestProduct from "./Components/LatestProduct";
import OpeningHours from "./Components/OpeningHours";
import Categories from "./Components/Categories";
import Review from "./Components/Review";
import AboutFugo from "./Components/AboutFugo";
import ContactForm from "./Components/ContactForm";
import Footer from "./Components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import Nav from "./Components/Nav";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openWhatsApp = () => {
    if (message.trim() !== "") {
      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/2347016027618?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank"); // Open in a new tab
    } else {
      alert("Please enter a message.");
    }
  };

  return (
    <div className="font-[600] justify-center items-center overflow-x-hidden">
      <Nav />
      <Hero />
      {/* ----------- */}
      {/* section 1 */}
      <div id="section1" className="flex flex-col px-0 md:px-40 pt-28 sm:pt-40 pb-4 text-[#333333]">
        <h2 className="text-xs md:text-sm font-[500] px-5 md:px-0">HERE's</h2>
        <h1 className="text-2xl md:text-4xl font-[600] py-2 px-5 md:px-0">What we offer.</h1>
        {/* card component*/}
        <div className="py-20">
          <Offer />
        </div>
      </div>
      {/* section 2 */}
      <div id="section3" className="flex flex-col font-[600] px-0 md:px-40 py-2 text-[#333333]">
        <h2 className="text-xs md:text-sm font-medium px-5 md:px-0">Opening hours</h2>
        <h1 className="text-2xl md:text-4xl py-2 px-5 md:px-0">Our Opening Hours.</h1>
        {/* card component*/}
        <div className="py-20 flex justify-center">
          <OpeningHours />
        </div>
      </div>
      {/* section 3 */}
      <div className="flex flex-col px-0 md:px-40 py-2 text-[#333333]">
        <h2 className="text-xs md:text-sm font-medium px-5 md:px-0">CHECK OUT</h2>
        <h1 className="text-2xl md:text-4xl font-[600] py-2 px-5 md:px-0">Our Latest Product.</h1>
        {/* card component*/}
        <div className="py-20">
          {/* NOTE: parse product data here. will be stored in an object array */}
          <LatestProduct />
        </div>
      </div>
      {/* section 4 */}
      <div className="flex flex-col font-[600] px-0 md:px-40 py-2 text-[#333333]">
        <h2 className="text-xs md:text-sm font-medium px-5 md:px-0">Shop</h2>
        <h1 className="text-2xl md:text-4xl py-2 px-5 md:px-0">By Categories.</h1>
        {/* card component*/}
        <div className="py-20 flex justify-center">
          <Categories />
        </div>
      </div>
      {/* section 5 */}
      <div className="flex flex-col font-[600] px-0 md:px-40 py-2 text-[#333333]">
        <h2 className="text-xs md:text-sm font-medium px-5 md:px-0">What they say</h2>
        <h1 className="text-2xl md:text-4xl py-2 px-5 md:px-0">Customer Review.</h1>
        {/* card component*/}
        <div className="py-20 flex justify-center">
          <Review />
        </div>
      </div>
      {/* section 6 */}
      <div id="section6" className="flex flex-col font-[600] px-0 md:px-40 py-2 text-[#333333]">
        <h2 className="text-xs md:text-sm px-5 md:px-0">About d'fugo hair</h2>
        <h1 className="text-2xl md:text-4xl py-2 px-5 md:px-0">Founder and CEO.</h1>
        {/* card component*/}
        <div className="py-20 flex justify-center">
          <AboutFugo />
        </div>
      </div>
      {/* section 7 */}
      <div id="section7" className="flex flex-col py-10 text-[#333333]">
        <ContactForm />
      </div>
      {/* -------------- */}

      {/* Floating WhatsApp Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-bl from-[#fee88e] to-[#CFAA3D] w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full fixed top-[80%] md:top-[70%] right-5 md:right-10 flex items-center justify-center shadow-lg cursor-pointer"
      >
        <Image width={35} height={35} className="w-[42%] md:w-[60%]" src={"/icons/message.png"} alt={"message"} />
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-4 sm:p-6 shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-sm"
            >
              ✕
            </button>

            {/* Modal Content */}
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
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default HomePage;

