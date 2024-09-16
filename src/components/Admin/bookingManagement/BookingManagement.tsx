/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Header from "../Header";
import { Table } from "../../ui/table";
import { Button } from "../../ui/button";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/features/user/bookingManagementApi";
import { CheckIcon, TrashIcon, XIcon } from "lucide-react";
import { format } from "date-fns";

import { toast } from "sonner";
import BookingDialog from "./BookingDialog";

interface Slot {
  startTime: string;
  endTime: string;
  date: string;
}

interface Room {
  name: string;
}

interface User {
  name: string;
}

interface Booking {
  _id: string;
  room: Room;
  user: User;
  slots: Slot[];
  isConfirmed: "unconfirmed" | "confirmed" | "cancelled";
  isDeleted?: boolean;
}

const BookingManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const { data: bookings, isLoading } = useGetAllBookingsQuery("");
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const handleButtonClick = async (booking: Booking) => {
    let newStatus: "unconfirmed" | "confirmed" | "cancelled";
    if (
      booking.isConfirmed === "unconfirmed" ||
      booking.isConfirmed === "cancelled"
    ) {
      newStatus = "confirmed"; // Approve the booking
    } else {
      newStatus = "cancelled"; // Cancel the booking
    }
    console.log({ id: booking._id, status: newStatus });
    try {
      await updateBooking({ id: booking._id, status: newStatus }).unwrap();
      // Handle success, e.g., show notification
    } catch (error: any) {
      console.log(error.message);
      // Handle error, e.g., show error notification
    }
  };

  const handleDeleteBooking = (id: string) => {
    setIsDialogOpen(true);
    setBookingToDelete(id);
    console.log(id);
  };

  const confirmDeleteSlot = async () => {
    if (bookingToDelete) {
      try {
        await deleteBooking(bookingToDelete).unwrap();
        toast.success("Booking deleted successfully", { duration: 2000 });
      } catch (err: any) {
        toast.error("Failed to delete Booking", { duration: 2000 });
        console.log(err);
      } finally {
        setIsDialogOpen(false);
        setBookingToDelete(null);
      }
    }
  };

  return (
    <div className="">
      <div className="p-0 md:p-0 w-full">
        <Header title="Booking Management" add="" onAddClick={undefined} />
        <div className="w-full overflow-x-auto">
          <Table className="text-[10px] md:text-[12px] lg:text-[18px] border border-gray-300">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th>Room</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data
                ?.filter((booking: any) => booking.isDeleted !== true)
                .map((booking: Booking) => (
                  <tr key={booking._id}>
                    <td className="px-1 py-1 pl-1 md:pl-2 lg:pl-10 border-b border-gray-200">
                      {booking.room.name}
                    </td>
                    <td className="px-2 py-1 pl-2 md:pl-2 lg:pl-5 border-b border-gray-200">
                      {booking.user.name}
                    </td>
                    <td className="px-1 py-1 pl-2 md:pl-2 lg:pl-10 border-b border-gray-200">
                      {format(new Date(booking.slots[0].date), "yyyy-MM-dd")}
                    </td>
                    <td className="px-2 py-1 pl-2 md:pl-2 lg:pl-10 border-b border-gray-200">
                      {booking.slots.map((slot) => (
                        <p key={slot.startTime}>
                          {slot.startTime}-{slot.endTime}
                        </p>
                      ))}
                    </td>
                    <td className="px-2 py-1 pl-2 md:pl-2 lg:pl-16 border-b border-gray-200">
                      {booking.isConfirmed}
                    </td>
                    <td className="px-2 py-1 pl-2 md:pl-2 lg:pl-20 border-b border-gray-200 flex space-x-1 pt-5">
                      <Button
                        onClick={() => handleButtonClick(booking)}
                        className="p-1 sm:p-2 md:p-2 lg:p-4 mr-1"
                      >
                        {booking.isConfirmed === "unconfirmed" ||
                        booking.isConfirmed === "cancelled" ? (
                          <CheckIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 text-green-500 lg:w-4" />
                        ) : (
                          <XIcon className="h-3 text-red-500 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => handleDeleteBooking(booking._id)}
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
        {isLoading && <h1 className="text-red-500 text-center ">Loading..</h1>}
        <BookingDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          confirmDeleteSlot={confirmDeleteSlot}
        />
      </div>
    </div>
  );
};

export default BookingManagement;
