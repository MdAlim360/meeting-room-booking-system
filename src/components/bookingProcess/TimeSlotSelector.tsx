// import React from "react";
// import { useGetAllSlotQuery } from "../api/authApi";

// const TimeSlotSelector = ({ selectedDate, selectedSlot, setSelectedSlot }) => {
//   const { data: slots, isLoading } = useGetAllSlotQuery();

//   if (isLoading) return <p>Loading slots...</p>;

//   const availableSlots = slots.filter(
//     (slot) =>
//       new Date(slot.date).toDateString() === selectedDate.toDateString() &&
//       !slot.isBooked
//   );

//   return (
//     <div className="my-4">
//       <label className="block text-gray-700">Select Time Slot:</label>
//       <div className="mt-2 grid grid-cols-2 gap-2">
//         {availableSlots.length ? (
//           availableSlots.map((slot) => (
//             <button
//               key={slot.id}
//               onClick={() => setSelectedSlot(slot)}
//               className={`p-2 border rounded ${
//                 selectedSlot?.id === slot.id ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {slot.time}
//             </button>
//           ))
//         ) : (
//           <p>No available slots for the selected date.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TimeSlotSelector;
