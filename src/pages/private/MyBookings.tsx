/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyBookingsQuery } from "@/redux/features/user/bookingManagementApi";
import { FiLoader } from "react-icons/fi";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { format } from "date-fns";

// Define interfaces
interface Slot {
  date: string;
  startTime: string;
  endTime: string;
  isConfirmed: "confirmed" | "cancelled" | "pending";
}

interface Room {
  name: string;
}

interface Booking {
  room: Room;
  slots: Slot[];
  isConfirmed: "confirmed" | "cancelled" | "pending";
  isDeleted: boolean;
}

interface MyBookingsResponse {
  data: Booking[] | any;
  isLoading: any;
}

interface GroupedBookings {
  [roomName: string]: {
    [dateKey: string]: Slot[];
  };
}

const MyBookings = () => {
  const {
    data: myBookings,
    isLoading,
    refetch,
  } = useGetMyBookingsQuery<MyBookingsResponse>("", {
    refetchOnMountOrArgChange: true, // Ensure data is refetched on every mount
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] p-5 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-green-600 mb-8">My Bookings</h1>
        <div className="flex items-center justify-center">
          <FiLoader className="animate-spin text-green-500" size={36} />
          <p className="text-center text-red-500 ml-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!myBookings || !myBookings.data || myBookings.data.length === 0) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] p-5 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-green-600 mb-8">My Bookings</h1>
        <p className="text-center text-red-500">No bookings found.</p>
      </div>
    );
  }

  const groupedBookings: GroupedBookings = myBookings.data.reduce(
    (acc: GroupedBookings, booking: Booking) => {
      if (booking.isDeleted) return acc;

      const roomName = booking.room.name;
      if (!acc[roomName]) {
        acc[roomName] = {};
      }

      booking.slots.forEach((slot) => {
        const dateKey = format(new Date(slot.date), "yyyy-MM-dd");
        if (!acc[roomName][dateKey]) {
          acc[roomName][dateKey] = [];
        }
        acc[roomName][dateKey].push({
          ...slot,
          isConfirmed: booking.isConfirmed,
        });
      });

      return acc;
    },
    {} as GroupedBookings
  );

  return (
    <div className="min-h-screen pt-16 bg-black p-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-600 mb-8">My Bookings</h1>
      <div className="w-full max-w-4xl grid gap-6">
        {Object.entries(groupedBookings).map(([roomName, dates]) => (
          <Card
            key={roomName}
            className="bg-[#1E1E1E] text-gray-400 shadow-lg rounded-lg transition-transform transform hover:scale-105"
          >
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-2xl text-green-700">
                {roomName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(dates)
                .sort(
                  ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
                )
                .map(([dateKey, slots]) => {
                  const formattedDate = format(
                    new Date(dateKey),
                    "MMMM dd, yyyy"
                  );
                  return (
                    <div
                      key={dateKey}
                      className="border-b  last:border-b-0 py-2"
                    >
                      <div className="text-lg text-green-800 font-semibold flex items-center space-x-2">
                        <FaCalendarAlt className="h-6 w-6 text-green-500" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="ml-8">
                        {slots.map((slot, i) => (
                          <div
                            key={i}
                            className="border-b last:border-b-0 py-2 flex items-center space-x-4"
                          >
                            <FaClock className="h-5 w-5 text-green-500" />
                            <p className="flex items-center justify-between relative">
                              <span>
                                {slot.startTime} - {slot.endTime}
                              </span>
                              {slot.isConfirmed === "confirmed" ? (
                                <div className="pl-[80px] md:pl-[400px] lg:pl-[580px]">
                                  <Badge className="bg-green-500 text-white py-1 px-4 text-xs">
                                    {slot.isConfirmed}
                                  </Badge>
                                </div>
                              ) : slot.isConfirmed === "cancelled" ? (
                                <div className="pl-[80px] md:pl-[400px] lg:pl-[580px]">
                                  <Badge className="bg-red-500 text-white py-1 px-4 text-xs">
                                    {slot.isConfirmed}
                                  </Badge>
                                </div>
                              ) : (
                                <div className="pl-[80px] md:pl-[400px] lg:pl-[580px]">
                                  <Badge className="text-white bg-yellow-500 py-1 px-2 text-xs">
                                    {slot.isConfirmed}
                                  </Badge>
                                </div>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
