/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";

interface SlotFormProps {
  selectedRoom: any;
  setSelectedRoom: (room: any) => void;
  updateSlotId: any;
  rooms: any;
  date: any;
  setDate: (date: any) => void;
  startTime: any;
  setStartTime: (time: any) => void;
  endTime: any;
  setEndTime: (time: any) => void;
  handleCancel: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleUpdateSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const SlotForm: React.FC<SlotFormProps> = ({
  selectedRoom,
  setSelectedRoom,
  updateSlotId,
  rooms,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  handleCancel,
  handleSubmit,
  handleUpdateSubmit,
}) => {
  // Wrapper functions to handle the MouseEvent and submit the form
  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button click behavior
    const form = e.currentTarget.closest("form"); // Get the closest form element
    if (form) {
      handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleFormUpdateSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default button click behavior
    const form = e.currentTarget.closest("form"); // Get the closest form element
    if (form) {
      handleUpdateSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div>
      <form className="space-y-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block pt-4 text-sm font-medium">Select Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            disabled={!!updateSlotId} // Disable the select input if updating a slot
          >
            <option value="" disabled>
              Choose a room
            </option>
            {rooms?.data?.result
              .filter((room: any) => !room.isDeleted)
              .map((room: any) => (
                <option key={room._id} value={room._id}>
                  {room.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="col-span-full flex justify-end space-x-4">
          <Button onClick={handleCancel} className="bg-gray-500 text-white">
            Cancel
          </Button>
          {updateSlotId ? (
            <Button
              onClick={handleFormUpdateSubmit}
              className="bg-blue-500 text-white"
            >
              Update Slot
            </Button>
          ) : (
            <Button
              onClick={handleFormSubmit}
              className="bg-blue-500 text-white"
            >
              Create Slot
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SlotForm;
