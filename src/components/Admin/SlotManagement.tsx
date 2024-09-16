// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import Header from "./Header";
// import { PencilIcon, TrashIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import { Table } from "../ui/table";
// import { format, parseISO } from "date-fns";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// } from "../ui/dialog";

// import { toast } from "sonner";
// import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";
// import {
//   useCreateSlotMutation,
//   useDeleteSlotMutation,
//   useGetAllSlotQuery,
//   useUpdateSlotMutation,
// } from "@/redux/features/admin/slotManagementApi";

// const SlotManagement = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [updateSlotId, setUpdateSlotId] = useState(null);
//   const [selectedRoom, setSelectedRoom] = useState("");
//   const [date, setDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [slotToDelete, setSlotToDelete] = useState(null);

//   const { data: rooms, isLoading } = useGetAllRoomsQuery(undefined);
//   const [createSlot] = useCreateSlotMutation();
//   const { data: slotDatas } = useGetAllSlotQuery(undefined);
//   console.log(slotDatas);

//   const [updateSlot] = useUpdateSlotMutation();
//   const [deleteSlot] = useDeleteSlotMutation();

//   const handleAddSlot = () => {
//     setShowForm(true);
//     setUpdateSlotId(null);
//     clearForm();
//   };

//   const handleUpdateSlot = (slot: any) => {
//     setShowForm(true);
//     setUpdateSlotId(slot._id);
//     setSelectedRoom(slot.room);
//     setDate(slot.date);
//     setStartTime(slot.startTime);
//     setEndTime(slot.endTime);
//   };

//   const clearForm = () => {
//     setSelectedRoom("");
//     setDate("");
//     setStartTime("");
//     setEndTime("");
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     clearForm();
//   };

//   const handleDeleteSlot = (id) => {
//     setIsDialogOpen(true);
//     setSlotToDelete(id);
//     console.log(id);
//   };

//   const confirmDeleteSlot = async () => {
//     if (slotToDelete) {
//       try {
//         await deleteSlot(slotToDelete).unwrap();
//         toast.success("Slot deleted successfully", { duration: 2000 });
//       } catch (err) {
//         toast.error("Failed to delete slot", { duration: 2000 });
//       } finally {
//         setIsDialogOpen(false);
//         setSlotToDelete(null);
//       }
//     }
//   };
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const updateData = {};
//     if (date) {
//       updateData.date = format(parseISO(date), "yyyy-MM-dd");
//     }
//     if (startTime) {
//       updateData.startTime = startTime;
//     }
//     if (endTime) {
//       updateData.endTime = endTime;
//     }
//     console.log("updateData", updateData);
//     try {
//       await updateSlot({ id: updateSlotId, updateData: updateData }).unwrap();
//       toast.success("Slot updated successfully", { duration: 2000 });

//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.data?.errorSources[0]?.message || "An error occurred", {
//         duration: 2000,
//       });
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const slotData = {
//       room: selectedRoom,
//       date,
//       startTime,
//       endTime,
//     };

//     console.log(slotData);

//     try {
//       await createSlot(slotData).unwrap();
//       toast.success("Slot created successfully", { duration: 2000 });
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.data?.errorSources[0]?.message || "An error occurred", {
//         duration: 2000,
//       });
//     }
//   };

//   return (
//     <div className="p-0 md:p-0 w-full">
//       <Header
//         title="Slot Management"
//         add="Create Slot"
//         onAddClick={handleAddSlot}
//       />

//       {showForm && (
//         <div>
//           <h1 className="text-xl text-center font-medium my-8 text-yellow-500">
//             {updateSlotId ? "Update Slot" : "Create Slot"}
//           </h1>
//           <form className="space-y-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block pt-4 text-sm font-medium">
//                 Select Room
//               </label>
//               <select
//                 value={selectedRoom}
//                 onChange={(e) => setSelectedRoom(e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//                 disabled={!!updateSlotId} // Disable the select input if updating a slot
//               >
//                 <option value="" disabled>
//                   Choose a room
//                 </option>
//                 {rooms?.data?.result
//                   .filter((room) => !room.isDeleted)
//                   .map((room) => (
//                     <option key={room._id} value={room._id}>
//                       {room.name}
//                     </option>
//                   ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Date</label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Start Time</label>
//               <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">End Time</label>
//               <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>

//             <div className="col-span-full flex justify-end space-x-4">
//               <Button onClick={handleCancel} className="bg-gray-500 text-white">
//                 Cancel
//               </Button>
//               {updateSlotId ? (
//                 <Button
//                   onClick={handleUpdateSubmit}
//                   className="bg-blue-500 text-white"
//                 >
//                   Update Slot
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={handleSubmit}
//                   className="bg-blue-500 text-white"
//                 >
//                   Create Slot
//                 </Button>
//               )}
//             </div>
//           </form>
//         </div>
//       )}

//       <Table className="text-[10px] md:text-[12px] lg:text-[18px] border border-gray-300 mt-8">
//         <thead className="bg-gray-100 border-b border-gray-300">
//           <tr>
//             <th className="border-r border-gray-300">Room Name</th>
//             <th className="border-r border-gray-300">Room No.</th>
//             <th className="border-r border-gray-300">Date</th>
//             <th className="border-r border-gray-300">Start Time</th>
//             <th className="border-r border-gray-300">End Time</th>
//             <th className="border-r border-gray-300">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {slotDatas?.data
//             ?.filter((slot) => !slot.isBooked && !slot.isDeleted)
//             .map((slot) => (
//               <tr key={slot?._id}>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {slot?.room?.name}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {slot?.room?.roomNo}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {format(parseISO(slot?.date), "yyyy-MM-dd")}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {slot?.startTime}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {slot?.endTime}
//                 </td>
//                 <td className="px-2 flex justify-center py-1 border-r border-b border-gray-200 space-x-1">
//                   <Button
//                     onClick={() => handleUpdateSlot(slot)}
//                     className="p-1 sm:p-2 md:p-2 lg:p-4 mr-1"
//                   >
//                     <PencilIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
//                   </Button>
//                   <Button
//                     onClick={() => handleDeleteSlot(slot._id)}
//                     className="p-1 sm:p-2 md:p-2 lg:p-4 mr-1 text-red-500"
//                   >
//                     <TrashIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </Table>

//       {isLoading && <h1 className="text-center text-red-600">Loading...</h1>}

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Are you sure?</DialogTitle>
//             <DialogDescription>
//               Do you really want to delete this slot? This action cannot be
//               undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={confirmDeleteSlot}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default SlotManagement;
