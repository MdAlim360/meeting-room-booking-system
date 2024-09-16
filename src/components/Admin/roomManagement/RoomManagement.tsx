/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useGetAllRoomsQuery,
  useUpdateRoomMutation,
} from "@/redux/features/admin/roomManagementApi";
import { toast } from "sonner";

import RoomTable from "./RoomTable";
import ReusableForm from "@/components/common/ReusableForm";
import RoomDialog from "./RoomDialog";
import Header from "../Header";
import { formFields, roomData, updateFormFields } from "../Constant";

const RoomManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateRoomId, setUpdateRoomId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const { data: rooms, isLoading } = useGetAllRoomsQuery(undefined);
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const handleAddRoom = () => setShowForm(true);
  const handleCancel = () => {
    setShowForm(false);
    setShowUpdateForm(false);
  };
  const handleUpdateRoom = async (id: string) => {
    setShowUpdateForm(true);
    setUpdateRoomId(id);
  };

  const handleDeleteRoom = (id: string) => {
    setIsDialogOpen(true);
    setRoomToDelete(id);
  };

  const confirmDeleteRoom = async () => {
    if (roomToDelete) {
      try {
        await deleteRoom(roomToDelete).unwrap();
        toast.success("Room deleted successfully", { duration: 2000 });
      } catch (err) {
        const errorMessage =
          (err as any).data?.errorSources?.[0]?.message || "An error occurred";
        toast.error(errorMessage, { duration: 2000 });
      }
    }
    setIsDialogOpen(false);
  };

  const [createRoom] = useCreateRoomMutation();

  const handleSubmit = async (data: any) => {
    try {
      const res = await createRoom(roomData(data)).unwrap();
      if (!res.data) throw new Error("Room create failed");
      toast.success("Room created successfully", { duration: 2000 });
      setShowForm(false);
    } catch (err) {
      const errorMessage =
        (err as any).data?.errorSources?.[0]?.message || "An error occurred";
      toast.error(errorMessage, { duration: 2000 });
    }
  };

  const handleUpdateRoomSubmit = async (data: any) => {
    try {
      const res = await updateRoom({
        id: updateRoomId,
        updateData: roomData(data),
      }).unwrap();
      if (!res.data) throw new Error("Room update failed");
      toast.success("Room updated successfully", { duration: 2000 });
      setShowUpdateForm(false);
    } catch (err) {
      const errorMessage =
        (err as any).data?.errorSources?.[0]?.message || "An error occurred";
      toast.error(errorMessage, { duration: 2000 });
    }
  };

  return (
    <div className="p-0 md:p-0 w-full min-h-screen">
      <Header
        title="Room Management"
        add="Create Room"
        onAddClick={handleAddRoom}
      />

      {showForm && (
        <div>
          <h1 className="text-xl text-center font-medium my-8 text-yellow-500">
            Room Creating Form
          </h1>
          <ReusableForm
            fields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {showUpdateForm && (
        <div>
          <h1 className="text-xl text-center font-medium my-8 text-yellow-500">
            Room Updating Form
          </h1>
          <ReusableForm
            fields={updateFormFields}
            onSubmit={handleUpdateRoomSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
      <RoomTable
        rooms={rooms}
        handleUpdateRoom={handleUpdateRoom}
        handleDeleteRoom={handleDeleteRoom}
      />

      {isLoading && <h1 className="text-center text-red-600">Loading...</h1>}
      <RoomDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        confirmDeleteRoom={confirmDeleteRoom}
      />
    </div>
  );
};

export default RoomManagement;
