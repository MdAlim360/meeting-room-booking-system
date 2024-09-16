import React from "react";
import Slider from "react-slick";
import { FaUsers, FaHistory, FaRocket } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUs = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: "linear",
  };

  return (
    <div className="bg-black   text-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-medium text-green-500 mb-12 text-center animate__animated animate__fadeIn">
          About Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Our Mission Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-1s">
            <FaRocket className="text-green-500 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-400">
              Our mission is to provide a seamless and efficient room booking
              experience that meets the diverse needs of our clients. We aim to
              offer top-notch meeting spaces equipped with the latest technology
              to ensure productive and successful meetings.
            </p>
          </div>

          {/* Meet the Team Section */}
          <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-2s">
            <FaUsers className="text-green-500 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
            <div className="overflow-hidden">
              <Slider {...settings}>
                <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md">
                  <img
                    src="https://i.ibb.co.com/PcyvB04/425729630-779093740914489-88362804609546993-n.jpg"
                    alt="Team Member 1"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200">
                      Totini
                    </h3>
                    <p className="text-gray-400">Chief Operating Officer</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md">
                  <img
                    src="https://i.ibb.co.com/dM2280T/432585165-18422791237006852-8358679973172565392-n.jpg"
                    alt="Team Member 2"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl text-gray-200 font-semibold">
                      Faria
                    </h3>
                    <p className="text-gray-400">Head of Marketing</p>
                  </div>
                </div>
                {/* Add more team members as needed */}
              </Slider>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-3s">
            <FaHistory className="text-green-500 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-400">
              From our humble beginnings to becoming a leader in the meeting
              room booking industry, our journey has been marked by innovation
              and a commitment to excellence. We started with a vision to
              revolutionize meeting spaces, and today, we proudly offer some of
              the best meeting rooms in the market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
