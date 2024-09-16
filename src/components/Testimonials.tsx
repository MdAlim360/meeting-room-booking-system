/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Leo Messi",
    role: "Footballer",
    image:
      "https://i.ibb.co.com/vVN5Ctx/161677893-289417855883145-3617900277534792447-n.jpg",
    testimonial:
      "This meeting room booking system is excellent. It's fast and very efficient!",
    rating: 5,
  },
  {
    name: "Totini",
    role: "CEO, Company libb",
    image:
      "https://i.ibb.co.com/PcyvB04/425729630-779093740914489-88362804609546993-n.jpg",
    testimonial:
      "This meeting room booking system is excellent. It's fast and very efficient!",
    rating: 5,
  },
  {
    name: "Tasnia Farin",
    role: "Project Manager, ABC Ltd.",
    image:
      "https://i.ibb.co.com/dM2280T/432585165-18422791237006852-8358679973172565392-n.jpg",
    testimonial:
      "Very intuitive and easy to use. It has saved us a lot of time!",
    rating: 4,
  },
  // Add more testimonials here
];

const TestimonialCard = ({ testimonial }: any) => {
  return (
    <div className="flex  flex-col sm:flex-row bg-gray-800 text-white p-6 rounded-lg shadow-lg items-center space-y-4 sm:space-y-0 sm:space-x-6 justify-around ">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-[300px] h-[300px]  object-cover rounded-sm"
      />
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
        <p className="text-sm text-gray-400">{testimonial.role}</p>

        <p className="mt-3 text-gray-300">{testimonial.testimonial}</p>
        <div className="flex items-center justify-center sm:justify-start space-x-1 text-yellow-400 mt-2">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomerTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-7xl mx-auto px-12 py-10 mt-12">
      <h2 className="text-3xl font-medium text-green-500 text-center mb-8">
        What Our Customers Say
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Slider>
    </div>
  );
};

export default CustomerTestimonials;
