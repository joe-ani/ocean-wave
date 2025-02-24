import Hero from "./Components/Hero";
import Offer from "./Components/Offer";
import LatestProduct from "./Components/LatestProduct";
import OpeningHours from "./Components/OpeningHours";
import Categories from "./Components/Categories";
import Review from "./Components/Review";
import AboutFugo from "./Components/AboutFugo";
import ContactForm from "./Components/ContactForm";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import WhatsAppButton from "./Components/WhatsAppButton";
import ClientMap from "./Components/ClientMap";

const HomePage = () => {
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
      {/* <ClientMap /> */}
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default HomePage;

