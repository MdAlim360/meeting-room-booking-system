// import { useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { Dialog, Transition } from "@headlessui/react";

// const RoomDetails = ({ room }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
//       <div className="grid grid-cols-1 md:grid-cols-2">
//         {/* Image Slider */}
//         <div className="relative h-64 md:h-auto overflow-hidden">
//           <img
//             src={room.images[0]}
//             alt={room.name}
//             className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
//           />
//         </div>
//         {/* Room Details */}
//         <div className="p-6">
//           <h2 className="text-2xl font-bold text-yellow-600 mb-2">
//             {room.name}
//           </h2>
//           <p className="text-gray-700 mb-1">Room No: {room.roomNo}</p>
//           <p className="text-gray-700 mb-1">Floor No: {room.floorNo}</p>
//           <p className="text-gray-700 mb-1">Capacity: {room.capacity}</p>
//           <p className="text-gray-700 mb-1">
//             Price Per Slot: ${room.pricePerSlot}
//           </p>
//           <p className="text-gray-700 mb-4">
//             Amenities: {room.amenities.join(", ")}
//           </p>
//           <button
//             onClick={openModal}
//             className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition-colors hover:bg-yellow-600 flex items-center"
//           >
//             Book Now <FaArrowRight className="ml-2" />
//           </button>
//         </div>
//       </div>

//       {/* Modal for Booking */}
//       <Transition appear show={isOpen} as={React.Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={React.Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={React.Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-medium leading-6 text-gray-900"
//                   >
//                     Booking Confirmation
//                   </Dialog.Title>
//                   <div className="mt-4">
//                     <p className="text-sm text-gray-500">
//                       Are you sure you want to book the room{" "}
//                       <span className="font-bold">{room.name}</span>?
//                     </p>
//                   </div>

//                   <div className="mt-6 flex justify-end space-x-4">
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
//                       onClick={closeModal}
//                     >
//                       Yes, Book Now
//                     </button>
//                     <button
//                       type="button"
//                       className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                       onClick={closeModal}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default RoomDetails;
