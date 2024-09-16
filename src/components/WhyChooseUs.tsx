import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger the animation once when the section enters the viewport

  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-16 mt-0 md:mt-10 "
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Text */}
        <motion.div
          className="w-full md:w-1/2 z-30 md:absolute md:left-0 lg:left-20 bg-[#1E1E1E] p-6 md:p-[14px] lg:p-6 rounded-lg md:rounded-none lg:rounded-lg"
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}} // Trigger animation on scroll
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Why Choose Us?
          </h2>
          <p className="text-sm text-gray-400 pb-4 pr-4">
            Our user-friendly platform ensures that your booking process is
            smooth and hassle-free, allowing you to focus on what matters most.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={24} />
              <span className="text-lg">Seamless Booking Experience</span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={24} />
              <span className="text-lg">Secure Transactions</span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={24} />
              <span className="text-lg">24/7 Customer Support</span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={24} />
              <span className="text-lg">Best Price Guarantee</span>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={24} />
              <span className="text-lg">Trusted by Thousands</span>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          className="w-full md:w-[75%] mt-8 md:mt-0 relative z-20 md:ml-auto"
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}} // Image comes from right side
          transition={{ duration: 1 }}
        >
          <motion.img
            src="https://i.ibb.co/vsP6Dz4/rooom-1.png" // Replace with the correct image path
            alt="Why Choose Us"
            className="w-full pt-16 md:pt-0 h-auto object-cover rounded-lg md:rounded-none lg:rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}} // Trigger the image animation
            transition={{ duration: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
