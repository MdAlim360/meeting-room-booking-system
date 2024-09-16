/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const RoomCard = ({ roomData }: any) => {
  return (
    <Link to={`/rooms/${roomData._id}`}>
      <div
        className={`max-w-xl h-[500px] overflow-hidden shadow-lg bg-[#1E1E1E]  p-8 duration-700 ease-out border-4 border-transparent group hover:shadow-gray-500 hover:shadow-xl `}
      >
        <div className="overflow-hidden">
          <img
            className="w-full h-64  object-cover transition-transform duration-500 transform group-hover:scale-110"
            src={roomData.image1}
            alt={roomData.name}
          />
        </div>
        <div className="p-6 text-white transition-colors duration-300">
          <h2 className="text-xl font-bold mb-2">{roomData.name}</h2>
          <p className="text-gray-400 mb-2">Capacity: {roomData.capacity}</p>
          <p className="text-gray-400 mb-4">
            Price Per Slot: ${roomData.pricePerSlot}
          </p>
          <Link
            to={`/rooms/${roomData._id}`}
            className="text-yellow-500 font-bold hover:text-green-500 transition-colors flex items-center"
          >
            Details <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
