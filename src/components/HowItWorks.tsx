import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaDoorOpen, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  // Create references for the image and text to track their visibility in the viewport
  const textRef = useRef(null);
  const imageRef = useRef(null);

  // Track when the text and image are in view
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-black text-white py-0 md:py-16 mt-0 md:mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left Section - Image */}
        <motion.div
          ref={imageRef}
          className="w-full md:w-[75%] mt-8 md:mt-0 relative z-20 md:mr-auto"
          initial={{ opacity: 0, x: -100 }}
          animate={isImageInView ? { opacity: 1, x: 0 } : {}} // Animate when in view
          transition={{ duration: 1 }}
        >
          <motion.img
            src="https://i.ibb.co.com/jz0fvpP/Pngtree-digital-render-of-a-conference-3759188.jpg" // Replace with the correct image path
            alt="Why Choose Us"
            className="hidden md:block w-full h-auto md:h-[460px] lg:h-auto object-cover rounded-lg md:rounded-none lg:rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isImageInView ? { opacity: 1, scale: 1 } : {}} // Animate when in view
            transition={{ duration: 1 }}
          />
        </motion.div>

        {/* Right Section - Text */}
        <motion.div
          ref={textRef}
          className="w-full md:w-1/2 z-30 md:absolute md:right-0 lg:right-20 bg-[#1E1E1E] p-6 md:p-[14px] lg:p-6 rounded-lg md:rounded-none lg:rounded-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={isTextInView ? { opacity: 1, x: 0 } : {}} // Animate when in view
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            How to Book a Room?
          </h2>
          <p className="text-sm text-gray-400 pb-4 pr-4">
            Our user-friendly platform ensures that your booking process is
            smooth and hassle-free, allowing you to focus on what matters most.
          </p>
          <div className="space-y-4">
            <div className="pb-2 flex gap-4 hover:bg-gray-800 transition duration-300 rounded-lg">
              <FaDoorOpen className="text-4xl text-yellow-500" />
              <div>
                <h3 className="text-xl font-semibold ">Select a Room</h3>
                <p className="text-gray-400">
                  Choose the perfect room for your meeting.
                </p>
              </div>
            </div>
            <div className="pb-2 flex gap-4 items-center hover:bg-gray-800 transition duration-300 rounded-lg">
              <FaCalendarAlt className="text-4xl text-red-500 " />
              <div>
                <h3 className="text-xl font-semibold">Choose Date & Time</h3>
                <p className="text-gray-400">
                  Pick the date and time that works best for you.
                </p>
              </div>
            </div>
            <div className="pb-2 flex gap-4 hover:bg-gray-800 transition duration-300 rounded-lg">
              <FaCheckCircle className="text-4xl text-green-500" />
              <div>
                <h3 className="text-xl font-semibold">Confirm Booking</h3>
                <p className="text-gray-400">
                  Review and confirm your booking with ease.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
