"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Map from '../Components/Map'

export default function ContactPage() {
  const router = useRouter();
  const targetLocation = { lat: 6.456559134970387, lng: 3.3842979366622847 };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-[#333333] p-4 pt-32 sm:pt-44">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6 mt-4 sm:mt-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer p-2"
          >
            <ArrowLeft
              className="text-yellow-500 w-6 h-6 sm:w-8 sm:h-8"
              onClick={() => router.back()}
            />
          </motion.div>
          <Image
            width={300}
            height={100}
            src={"/icons/luxury.png"}
            alt={"luxury"}
            className="w-[180px] sm:w-[300px]"
          />
          <div className="w-6 sm:w-8"></div>
        </div>

        {/* Map Container */}
        <div className="w-full mt-6 sm:mt-10">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#A4A4A4]">
            <Map height="100%" className="absolute inset-0" />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 sm:mt-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Visit Our Store</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            D&apos;Fugo Hair<br />
            10, Balogun street<br />
            Lagos Island, Lagos Nigeria
          </p>

          <div className="space-y-2 text-gray-600 mb-8">
            <p className="text-sm sm:text-base">Monday - Saturday: 8:00 AM - 1:00 PM</p>
            <p className="text-sm sm:text-base text-red-400">Sunday: Closed</p>
            <p className="text-sm sm:text-base mt-4">📞 +2348038683235</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${targetLocation.lat},${targetLocation.lng}`)}
            className="flex items-center justify-center space-x-2 mx-auto bg-[#333333] text-white 
            py-3 px-8 rounded-md hover:opacity-90 transition-opacity text-base sm:text-lg"
          >
            <span>Get Directions</span>
            <Image
              width={20}
              height={20}
              src="/icons/location.png"
              alt="location"
              className="ml-2"
            />
          </motion.button>
        </div>
      </div>
    </div>
  )
}