/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useCreateBookingMutation } from "@/redux/features/user/bookingManagementApi";
import { toast } from "sonner";
import { FaCalendarAlt, FaClock, FaDoorOpen } from "react-icons/fa";

// Define types for booking data, slots, and user information
interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  room: {
    name: string;
    pricePerSlot: number;
  };
}

interface BookingData {
  date: string;
  slots: Slot[];
  room: string;
  user: {
    id: string;
  };
}

interface UserInfo {
  user: {
    name: string;
    userId: string;
  };
}

const Checkout = () => {
  const [price, setPrice] = useState<number>(0);
  const [slots, setSlots] = useState<string[]>([]);
  const bookingData = useAppSelector(
    (state: RootState) => state.bookingData as unknown as BookingData
  );
  const userInfo = useAppSelector(
    (state: RootState) => state.auth as unknown as UserInfo
  );

  useEffect(() => {
    if (bookingData?.slots) {
      const ids = bookingData.slots.map((slot) => slot._id);
      setSlots(ids);
    }
  }, [bookingData]);

  useEffect(() => {
    if (bookingData?.slots) {
      const calculatedPrice = bookingData.slots.reduce(
        (total, slot) => total + (slot.room?.pricePerSlot || 0),
        0
      );
      setPrice(calculatedPrice);
    }
  }, [bookingData]);

  const totalPrice = price;

  const creatingBookingData = {
    date: bookingData.date,
    slots,
    room: bookingData.room,
    user: bookingData?.user?.id,
  };

  const [createBooking] = useCreateBookingMutation();

  const handleConfirmBooking = async () => {
    try {
      const res = await createBooking(creatingBookingData).unwrap();
      if (!res.data) throw new Error("Room booking failed");
      window.location.href = res.data.payment_url;
      toast.success("Wait for payment", { duration: 2000 });
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.errorSources?.[0]?.message || "An error occurred";
      toast.error(errorMessage, { duration: 2000 });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gray-900 h-full">
      <img
        src="https://i.ibb.co.com/ZVc9VfY/rooom.png"
        alt="Office Co-Working Space"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 container p-16 bg-zinc-500    shadow-lg rounded-lg max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Booking Summary
        </h1>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-green-500 mb-4 flex items-center">
            <FaDoorOpen className="mr-2 text-gray-50" />
            {bookingData?.slots?.[0]?.room?.name}
          </h2>

          <p className="text-lg mb-4 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-50" />
            <span className="font-medium">Date: </span>
            {"  "} {format(new Date(bookingData?.date), "PPP")}
          </p>
          <div className="text-lg mb-4">
            <div className="flex items-center">
              <FaClock className="mr-2 text-gray-50" />
              <p className="font-medium">Time Slots:</p>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              {bookingData?.slots?.map((slot) => (
                <span key={slot._id} className="bg-gray-400 p-2 rounded">
                  {`${slot?.startTime} - ${slot?.endTime}`}
                </span>
              ))}
            </div>
          </div>
          <p className="text-lg font-semibold mb-4">
            Total Cost: <span className="text-green-600">${totalPrice}</span>
          </p>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-xl font-semibold mb-2">User Info</h3>
            <p className="text-lg mb-2">
              <strong>Name:</strong> {userInfo?.user?.name}
            </p>
            <p className="text-lg mb-4">
              <strong>Email:</strong> {userInfo?.user?.userId}
            </p>
          </div>
          <button
            onClick={handleConfirmBooking}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded mt-4 transition duration-300"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
