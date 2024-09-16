import React, { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, CheckCircleIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useGetSlotQuery } from "@/redux/features/admin/slotManagementApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBookingData } from "@/redux/features/user/bookingManagementSlice";
import { Link, useParams } from "react-router-dom";

interface BookingFormProps {
  roomId: string;
}

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  isDeleted: boolean;
}

type User = {
  id: string;
  name: string;
  userId: string;
};

const BookingForm: React.FC<BookingFormProps> = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { roomId } = useParams<{ roomId: string }>();
  const user = useAppSelector((state) => state.auth.user) as User | null;

  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
  const {
    data: slots,
    isLoading,
    isError,
    refetch,
  } = useGetSlotQuery(
    { date: formattedDate, roomId: roomId || "" },
    { skip: !date }
  );

  const handleSlotSelection = (slot: Slot) => {
    setSelectedSlots((prevSelectedSlots) =>
      prevSelectedSlots.some((selectedSlot) => selectedSlot._id === slot._id)
        ? prevSelectedSlots.filter(
            (selectedSlot) => selectedSlot._id !== slot._id
          )
        : [...prevSelectedSlots, slot]
    );
  };

  const dispatch = useAppDispatch();
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlots.length === 0) {
      alert("Please select at least one slot.");
      return;
    }

    const bookingData = {
      date: formattedDate,
      slots: selectedSlots,
      room: roomId,
      user: user,
    };
    dispatch(setBookingData(bookingData));

    console.log("Booking Data:", bookingData);
    // Implement API call to create booking
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedSlots([]); // Clear selected slots when a new date is selected
    setPopoverOpen(false);
    refetch(); // Refetch the slots for the new date
    // Always close the popover after selecting a date
  };

  return (
    <div className="bg-black pt-36 pb-36">
      <div className="max-w-md mx-auto p-6 bg-[#1E1E1E] shadow-lg rounded-lg">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-200">
            Book Your Room
          </h2>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full bg-gray-500 justify-start text-left font-normal ${
                  !date ? "text-gray-500" : "text-gray-200"
                }`}
                onClick={() => setPopoverOpen(!popoverOpen)}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                {formattedDate ? (
                  formattedDate
                ) : (
                  <span className="text-white">Select a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {date && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-400">
                Select Time:
              </h3>
              {isLoading ? (
                <p className="text-gray-600">Loading slots...</p>
              ) : isError ? (
                <p className="text-red-600">
                  No slots available for the selected date.
                </p>
              ) : slots?.data?.length ? (
                <div className="grid grid-cols-1 gap-4 ">
                  {slots.data
                    .filter((slot: Slot) => !slot.isBooked && !slot.isDeleted)
                    .sort((a: Slot, b: Slot) => {
                      return (
                        new Date(`1970/01/01 ${a.startTime}`).getTime() -
                        new Date(`1970/01/01 ${b.startTime}`).getTime()
                      );
                    })
                    .map((slot: Slot) => (
                      <Button
                        key={slot._id}
                        variant={
                          selectedSlots.some(
                            (selectedSlot) => selectedSlot._id === slot._id
                          )
                            ? "solid"
                            : "outline"
                        }
                        onClick={() => handleSlotSelection(slot)}
                        className={`w-full flex justify-between items-center ${
                          selectedSlots.some(
                            (selectedSlot) => selectedSlot._id === slot._id
                          )
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "bg-white border-gray-300 text-gray-800"
                        }`}
                      >
                        <span className="flex items-center">
                          <ClockIcon className="mr-2 h-5 w-5 text-gray-600" />
                          {slot.startTime} - {slot.endTime}
                        </span>
                        {selectedSlots.some(
                          (selectedSlot) => selectedSlot._id === slot._id
                        ) && (
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        )}
                      </Button>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600">
                  No slots available for the selected date.
                </p>
              )}
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-200">
              Your Information:
            </h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-400">
                Name
              </label>
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="mt-1 text-gray-300 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                type="email"
                value={user?.userId || ""}
                disabled
                className="mt-1 text-gray-300 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <Link to={"/checkOut"}>
              <Button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-md shadow-lg hover:bg-green-500 transition duration-150"
              >
                Check Out
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
