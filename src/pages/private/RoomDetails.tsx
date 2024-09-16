import { Link, useParams } from "react-router-dom";
import { useGetSingleRoomsQuery } from "@/redux/features/admin/roomManagementApi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  FaDoorOpen,
  FaBuilding,
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";
import Btn from "@/components/common/Btn";

const RoomDetails = () => {
  const { roomId } = useParams();
  const { data, isError, isLoading } = useGetSingleRoomsQuery(roomId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (isError || !data.data) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-2xl font-semibold text-red-500">
          Error loading room details.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black lg:flex-row justify-evenly items-center px-4 lg:px-0 space-y-8 lg:space-y-0 py-16 md:py-16 lg:py-36">
      <div className="lg:w-1/2 w-full flex justify-center items-center relative">
        <Carousel className="shadow-lg rounded-lg overflow-hidden">
          <CarouselContent>
            <CarouselItem>
              <img
                src={data.data.image1}
                alt={data.data.name}
                className="w-full h-auto object-cover rounded-t-lg"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src={data.data.image2}
                alt={data.data.name}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src={data.data.image3}
                alt={data.data.name}
                className="w-full h-auto object-cover"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 text-3xl bg-green-500 text-white rounded-full p-2 cursor-pointer hover:bg-green-600 transition-colors duration-300" />
          <CarouselNext className="absolute right-0 text-3xl bg-green-500 text-white rounded-full p-2 cursor-pointer hover:bg-green-600 transition-colors duration-300" />
        </Carousel>
      </div>
      <div className="lg:w-1/3 w-full space-y-6">
        <h1 className="text-4xl font-bold text-green-700 mb-4 border-b-4 border-yellow-400 pb-2">
          {data.data.name}
        </h1>
        <p className="flex items-center text-lg text-gray-400 mb-4 transition-transform transform hover:translate-x-1">
          <FaDoorOpen className="text-green-600 mr-2" />
          <span className="font-semibold pr-1">Room No: </span>{" "}
          {data.data.roomNo}
        </p>
        <p className="flex items-center text-lg text-gray-400 mb-4 transition-transform transform hover:translate-x-1">
          <FaBuilding className="text-green-600 mr-2" />
          <span className="font-semibold pr-1">Floor No: </span>{" "}
          {data.data.floorNo}
        </p>
        <p className="flex items-center text-lg text-gray-400 mb-4 transition-transform transform hover:translate-x-1">
          <FaUsers className="text-green-600 mr-2" />
          <span className="font-semibold pr-1">Capacity: </span>{" "}
          {data.data.capacity}
        </p>
        <p className="flex items-center text-lg text-gray-400 mb-4 transition-transform transform hover:translate-x-1">
          <FaMoneyBillWave className="text-green-600 mr-2" />
          <span className="font-semibold pr-1">Price Per Slot: </span>
          {data.data.pricePerSlot} tk
        </p>
        <p className="flex items-center text-lg text-gray-400 transition-transform transform hover:translate-x-1">
          <FaCheckCircle className="text-green-600 mr-2" />
          <span className="font-semibold pr-1">Amenities: </span>{" "}
          {data.data.amenities.join(", ")}
        </p>
        <div className="flex justify-center lg:justify-start mt-8">
          <Link to={`/booked-form/${roomId}`}>
            <Btn title="Book Now" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
