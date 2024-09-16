import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { PencilIcon, TrashIcon } from "lucide-react";
import React from "react";

interface Room {
  _id: string;
  name: string;
  roomNo: string;
  floorNo: string;
  capacity: number;
  pricePerSlot: number;
  isDeleted: boolean;
}

interface RoomTableProps {
  rooms: {
    data: {
      result: Room[];
    };
  };
  handleUpdateRoom: (id: string) => void;
  handleDeleteRoom: (id: string) => void;
}

const RoomTable: React.FC<RoomTableProps> = ({
  rooms,
  handleUpdateRoom,
  handleDeleteRoom,
}) => {
  return (
    <div>
      <Table className="text-[10px] md:text-[12px] lg:text-[18px] border border-gray-300">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="border-r border-gray-300">Room Name</th>
            <th className="border-r border-gray-300">Room No.</th>
            <th className="border-r border-gray-300">Floor No.</th>
            <th className="border-r border-gray-300">Capacity</th>
            <th className="border-r border-gray-300">Price Per Slot</th>
            <th className="border-r border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms?.data?.result
            .filter((room) => !room.isDeleted)
            .map((room) => (
              <tr key={room._id}>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {room.name}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {room.roomNo}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {room.floorNo}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {room.capacity}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {room.pricePerSlot}
                </td>
                <td className="px-2 flex justify-center py-1 border-r border-b border-gray-200 space-x-1">
                  <Button
                    onClick={() => handleUpdateRoom(room._id)}
                    className="p-1 sm:p-2 md:p-2 lg:p-4 mr-1"
                  >
                    <PencilIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteRoom(room._id)}
                    className="p-1 sm:p-2 text-red-600 md:p-2 lg:p-4"
                  >
                    <TrashIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RoomTable;
