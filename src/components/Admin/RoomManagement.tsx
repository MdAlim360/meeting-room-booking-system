// import { useState } from "react";
// import Header from "./Header";
// import { PencilIcon, TrashIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import { Table } from "../ui/table";
// import ReusableForm from "../common/ReusableForm";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// } from "../ui/dialog";
// import {
//   useCreateRoomMutation,
//   useDeleteRoomMutation,
//   useGetAllRoomsQuery,
//   useUpdateRoomMutation,
// } from "@/redux/features/admin/roomManagementApi";
// import { toast } from "sonner";
// import { formFields, roomData, updateFormFields } from "./Constant";

// const RoomManagement = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [updateRoomId, setUpdateRoomId] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [roomToDelete, setRoomToDelete] = useState(null);

//   const { data: rooms, isLoading } = useGetAllRoomsQuery(undefined);
//   const [updateRoom] = useUpdateRoomMutation();
//   const [deleteRoom] = useDeleteRoomMutation();

//   const handleAddRoom = () => setShowForm(true);
//   const handleCancel = () => {
//     setShowForm(false);
//     setShowUpdateForm(false);
//   };
//   const handleUpdateRoom = async (id: string) => {
//     setShowUpdateForm(true);
//     setUpdateRoomId(id);
//   };

//   const handleDeleteRoom = (id: string) => {
//     setIsDialogOpen(true);
//     setRoomToDelete(id);
//   };

//   const confirmDeleteRoom = async () => {
//     if (roomToDelete) {
//       try {
//         await deleteRoom(roomToDelete).unwrap();
//         toast.success("Room deleted successfully", { duration: 2000 });
//       } catch (err) {
//         toast.error("Failed to delete room", { duration: 2000 });
//       } finally {
//         setIsDialogOpen(false);
//         setRoomToDelete(null);
//       }
//     }
//   };

//   const [createRoom] = useCreateRoomMutation();

//   const handleSubmit = async (data) => {
//     try {
//       const res = await createRoom(roomData(data)).unwrap();
//       if (!res.data) throw new Error("Room create failed");
//       toast.success("Room created successfully", { duration: 2000 });
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.data?.errorSources[0]?.message || "An error occurred", {
//         duration: 2000,
//       });
//     }
//   };

//   const handleUpdateRoomSubmit = async (data) => {
//     try {
//       const res = await updateRoom({
//         id: updateRoomId,
//         updateData: roomData(data),
//       }).unwrap();
//       if (!res.data) throw new Error("Room update failed");
//       toast.success("Room updated successfully", { duration: 2000 });
//       setShowUpdateForm(false);
//     } catch (err) {
//       toast.error(err.data?.errorSources[0]?.message || "An error occurred", {
//         duration: 2000,
//       });
//     }
//   };

//   return (
//     <div className="p-0 md:p-0 w-full">
//       <Header
//         title="Room Management"
//         add="Create Room"
//         onAddClick={handleAddRoom}
//       />

//       {showForm && (
//         <div>
//           <h1 className="text-xl text-center font-medium my-8 text-yellow-500">
//             Room Creating Form
//           </h1>
//           <ReusableForm
//             fields={formFields}
//             onSubmit={handleSubmit}
//             onCancel={handleCancel}
//           />
//         </div>
//       )}

//       {showUpdateForm && (
//         <div>
//           <h1 className="text-xl text-center font-medium my-8 text-yellow-500">
//             Room Updating Form
//           </h1>
//           <ReusableForm
//             fields={updateFormFields}
//             onSubmit={handleUpdateRoomSubmit}
//             onCancel={handleCancel}
//           />
//         </div>
//       )}

//       <Table className="text-[10px] md:text-[12px] lg:text-[18px] border border-gray-300">
//         <thead className="bg-gray-100 border-b border-gray-300">
//           <tr>
//             <th className="border-r border-gray-300">Room Name</th>
//             <th className="border-r border-gray-300">Room No.</th>
//             <th className="border-r border-gray-300">Floor No.</th>
//             <th className="border-r border-gray-300">Capacity</th>
//             <th className="border-r border-gray-300">Price Per Slot</th>
//             <th className="border-r border-gray-300">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms?.data?.result
//             .filter((room) => !room.isDeleted) // Filter out rooms where isDelete is true
//             .map((room) => (
//               <tr key={room._id}>
//                 <td className="px-2  text-center py-1 border-r border-b border-gray-200">
//                   {room.name}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {room.roomNo}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {room.floorNo}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {room.capacity}
//                 </td>
//                 <td className="px-2 text-center py-1 border-r border-b border-gray-200">
//                   {room.pricePerSlot}
//                 </td>
//                 <td className="px-2 justify-center py-1 border-r border-b border-gray-200 flex space-x-1">
//                   <Button
//                     onClick={() => handleUpdateRoom(room._id)}
//                     className="p-1 sm:p-2 md:p-2 lg:p-4 mr-1"
//                   >
//                     <PencilIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
//                   </Button>
//                   <Button
//                     onClick={() => handleDeleteRoom(room._id)}
//                     className="p-1 sm:p-2 text-red-600 md:p-2 lg:p-4"
//                   >
//                     <TrashIcon className="h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4" />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </Table>

//       {isLoading && <h1 className="text-center text-red-600">Loading...</h1>}

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogTrigger />
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this room? This action cannot be
//               undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               onClick={() => setIsDialogOpen(false)}
//               className="bg-gray-500 text-white"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={confirmDeleteRoom}
//               className="bg-red-500 text-white"
//             >
//               Confirm
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default RoomManagement;
