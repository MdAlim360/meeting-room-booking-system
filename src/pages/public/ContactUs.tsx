import Btn from "@/components/common/Btn";
import { Input } from "@/components/ui/input";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-black min-h-screen text-white py-16 pt-10 md:pt-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-center text-3xl font-bold text-green-500 mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Subject"
                  className="p-3 border border-gray-700 rounded-md bg-gray-900 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white transition-all duration-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <Btn title="Send Message" />
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-green-500 mr-3" />
              <p>123 Meeting Room St, Suite 456, City, Country</p>
            </div>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-green-500 mr-3" />
              <p>(123) 456-7890</p>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-green-500 mr-3" />
              <p>contact@meetingrooms.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
