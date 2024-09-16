import {
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
  FaHeadset,
} from "react-icons/fa";
import { Card, CardContent, CardHeader } from "./ui/card";

const services = [
  {
    icon: <FaCheckCircle />,
    title: "Real-Time Availability",
    description: "Know what's available at any moment.",
    color: "bg-green-600",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Instant Booking Confirmation",
    description: "Book with confidence and get instant confirmation.",
    color: "bg-blue-600",
  },
  {
    icon: <FaClock />,
    title: "Flexible Scheduling",
    description: "Schedule at your convenience with flexible options.",
    color: "bg-yellow-600",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description: "We're here to help whenever you need us.",
    color: "bg-purple-600",
  },
];

const ServiceAdvertisement = () => {
  return (
    <div className="py-2 md:py-20 bg-black  ">
      <div className="max-w-7xl px-4 mx-auto">
        <h2 className="text-3xl font-medium text-center mb-16 text-green-500">
          Our Premium Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 lg:gap-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105`}
            >
              <div
                className={`absolute inset-0 transition-colors duration-500 ${service.color} group-hover:bg-white`}
              ></div>
              <div
                className={`absolute inset-0  transition-transform duration-500 transform group-hover:translate-y-full ${service.color}`}
              ></div>
              <CardHeader className="flex items-center justify-center h-32 relative z-10">
                <div className="text-6xl text-white group-hover:text-green-600 transition-colors duration-500">
                  {service.icon}
                </div>
              </CardHeader>
              <CardContent className="relative z-10 text-center px-6 py-8">
                <h3 className="text-3xl font-semibold mb-3 group-hover:text-green-600 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-200 group-hover:text-gray-800 transition-colors duration-500">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAdvertisement;
