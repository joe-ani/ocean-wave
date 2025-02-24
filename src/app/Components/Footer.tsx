"use client"
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="w-full bg-[#111] text-white pt-12 pb-6 font-light">
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
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400 font-light">
                            <li>123 Hair Street</li>
                            <li>New York, NY 10001</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Email: info@dfugohair.com</li>
                        </ul>
                    </div>

                    {/* Social Media - temporary version without icons */}
                    <div>
                        <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                FB
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                IG
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                TW
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