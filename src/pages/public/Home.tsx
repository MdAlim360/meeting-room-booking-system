import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Rooms from "@/components/Rooms";
import ContactUs from "./ContactUs";
import ServiceAdvertisement from "@/components/ServiceAdvertisement";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import AboutUs from "./AboutUs";
import { FaArrowUp } from "react-icons/fa";
import Footer from "@/components/layout/Footer";

const Home = () => {
  // State to control visibility of the "Scroll to Top" button
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-black overflow-hidden">
      <div className="relative top-[-0px] md:top-[-35px] lg:top-[-0px]">
        <Header />
        <ServiceAdvertisement />
        <Rooms />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <ContactUs />
        <div className="-mt-16 md:-mt-10 lg:-mt-28">
          <AboutUs />
        </div>
        <Footer />
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-2 overflow-hidden bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Home;
