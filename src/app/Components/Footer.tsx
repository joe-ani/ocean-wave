"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [showAdminPrompt, setShowAdminPrompt] = useState(false);
    const [adminKey, setAdminKey] = useState('');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleGetDirections = () => {
        if (!isMounted || typeof window === 'undefined') return;
        window?.open(`https://www.google.com/maps/search/?api=1&query=6.456559134970387,3.3842979366622847`);
    };

    const handleAdminAccess = () => {
        if (adminKey === 'fugo101') {
            localStorage.setItem('adminKey', adminKey);
            window.location.href = '/admin';
        } else {
            alert('Invalid admin key');
            setAdminKey('');
        }
    };

    const handleCloseModal = () => {
        setShowAdminPrompt(false);
        setAdminKey('');
    };

    return (
        <footer className="w-full bg-[#111] text-white pt-24 pb-6 font-light mt-auto">
            <AnimatePresence>
                {showAdminPrompt && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-[320px] sm:max-w-md"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-gray-800 font-bold text-lg mb-3 sm:mb-4">Admin Access</h3>
                            <input
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                placeholder="Enter admin key"
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg mb-3 sm:mb-4 font-[500] text-gray-800"
                            />
                            <div className="flex justify-end space-x-2 sm:space-x-3">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-3 font-[500] sm:px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdminAccess}
                                    className="px-3 sm:px-4 py-2 font-[500] bg-[#333333] text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                                >
                                    Access
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="flex flex-col space-y-4">
                        <Image
                            src="/logo.png"
                            alt="DFugo Hair"
                            width={150}
                            height={60}
                            className="mb-4"
                        />
                        <p className="text-gray-400 text-sm font-light">
                            Premium quality hair products and accessories for all your styling needs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition font-light">Home</Link></li>
                            <li><Link href="/shop" className="text-gray-400 hover:text-white transition font-light">Shop</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition font-light">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition font-light">Contact</Link></li>
                            <li>
                                <button
                                    onClick={() => setShowAdminPrompt(true)}
                                    className="text-gray-400 hover:text-white transition font-light text-left w-full"
                                >
                                    Admin
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Contact Us</h3>
                        <ul onClick={handleGetDirections} className="space-y-2 text-gray-400 font-light cursor-pointer">
                            10, Balogun street<br />
                            Lagos Island, Lagos Nigeria
                        </ul>
                    </div>

                    {/* Social Media - temporary version without icons */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                FB
                            </a>
                            <a href="https://www.tiktok.com/@d_fugo_hair" className="text-gray-400 hover:text-white transition">
                                TK
                            </a>
                            <a href="https://www.instagram.com/@d_fugo_hair" className="text-gray-400 hover:text-white transition">
                                IG
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm font-light">
                    <p>&copy; {new Date().getFullYear()} DFugo Hair. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer