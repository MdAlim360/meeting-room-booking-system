import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pl-6">
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <p>Email: info@meetingroomsystem.com</p>
            <p>Phone: +123-456-7890</p>
            <p>Office: 123 Meeting St, Business City, Country</p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-center text-center">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-gray-400">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Additional Links */}
          <div className="text-center md:text-right pr-0 md:pr-8">
            <h2 className="text-lg font-semibold mb-4">Additional Links</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>&copy; 2024 Meeting Room Booking System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
