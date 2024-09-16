import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { parseISO, format } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";
import React from "react";

interface Room {
  name: string;
  roomNo: string;
}

interface Slot {
  _id: string;
  room: Room;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isDeleted: boolean;
}

interface SlotTableProps {
  slotDatas: {
    data: Slot[];
  };
  handleUpdateSlot: (slot: Slot) => void;
  handleDeleteSlot: (id: string) => void;
}

const SlotTable: React.FC<SlotTableProps> = ({
  slotDatas,
  handleUpdateSlot,
  handleDeleteSlot,
}) => {
  return (
    <div>
      <Table className="text-[10px] md:text-[12px] lg:text-[18px] border border-gray-300 mt-8">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            <th className="border-r border-gray-300">Room Name</th>
            <th className="border-r border-gray-300">Room No.</th>
            <th className="border-r border-gray-300">Date</th>
            <th className="border-r border-gray-300">Start Time</th>
            <th className="border-r border-gray-300">End Time</th>
            <th className="border-r border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slotDatas?.data
            ?.filter((slot) => !slot.isBooked && !slot.isDeleted)
            .sort((a: Slot, b: Slot) => {
              return (
                new Date(`1970/01/01 ${a.startTime}`).getTime() -
                new Date(`1970/01/01 ${b.startTime}`).getTime()
              );
            })
            .map((slot) => (
              <tr key={slot?._id}>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {slot?.room?.name}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {slot?.room?.roomNo}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {format(parseISO(slot?.date), "yyyy-MM-dd")}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {slot?.startTime}
                </td>
                <td className="px-2 text-center py-1 border-r border-b border-gray-200">
                  {slot?.endTime}
                </td>
                <td className="px-2 flex justify-center py-1 border-r border-b border-gray-200 space-x-1">
                  <Button
                    onClick={() => handleUpdateSlot(slot)}
                    className="p-1 sm:p-2 md:p-2 lg:p-4 mr-1"
                  >
                    <PencilIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteSlot(slot._id)}
                    className="p-1 sm:p-2 md:p-2 lg:p-4 mr-1 text-red-500"
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

export default SlotTable;
