/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";
import RoomCard from "./RoomCard";
import { Link } from "react-router-dom";
import Btn from "./common/Btn";
import { motion } from "framer-motion";

const Rooms = () => {
  const { data: rooms, isLoading } = useGetAllRoomsQuery(undefined);

  // Sorting and slicing the rooms array to get the first 6 rooms
  const sortedRooms = rooms?.data?.result
    ?.filter((room: any) => room.isDeleted !== true)
    ?.slice(0, 6);

  // Animation variants for different directions
  const variants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "bottom" ? 100 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      {isLoading && <h1 className="text-center text-red-500">Loading...</h1>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {sortedRooms?.map((room: any, index: number) => {
          // Determine the direction based on index
          const direction =
            index % 3 === 0 ? "left" : index % 3 === 1 ? "bottom" : "right";

          return (
            <motion.div
              key={room._id}
              custom={direction}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={variants}
            >
              <RoomCard roomData={room} />
            </motion.div>
          );
        })}
      </div>

      <div className="text-center my-5">
        <Link to={"/meeting-rooms"}>
          <Btn title="Show More" />
        </Link>
      </div>
    </div>
  );
};

export default Rooms;
