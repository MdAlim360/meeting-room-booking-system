/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { format, parseISO } from "date-fns";

import { toast } from "sonner";
import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";
import {
  useCreateSlotMutation,
  useDeleteSlotMutation,
  useGetAllSlotQuery,
  useUpdateSlotMutation,
} from "@/redux/features/admin/slotManagementApi";
import Header from "../Header";
import SlotForm from "./SlotForm";
import SlotDialog from "./SlotDialog";
import SlotTable from "./SlotTable";

const SlotManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [updateSlotId, setUpdateSlotId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  const { data: rooms, isLoading } = useGetAllRoomsQuery(undefined);
  const [createSlot] = useCreateSlotMutation();
  const { data: slotDatas } = useGetAllSlotQuery(undefined);
  console.log(slotDatas);

  const [updateSlot] = useUpdateSlotMutation();
  const [deleteSlot] = useDeleteSlotMutation();

  const handleAddSlot = () => {
    setShowForm(true);
    setUpdateSlotId(null);
    clearForm();
  };

  const handleUpdateSlot = (slot: any) => {
    setShowForm(true);
    setUpdateSlotId(slot._id);
    setSelectedRoom(slot.room);
    setDate(slot.date);
    setStartTime(slot.startTime);
    setEndTime(slot.endTime);
  };

  const clearForm = () => {
    setSelectedRoom("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  const handleCancel = () => {
    setShowForm(false);
    clearForm();
  };

  const handleDeleteSlot = (id: any) => {
    setIsDialogOpen(true);
    setSlotToDelete(id);
    console.log(id);
  };

  const confirmDeleteSlot = async () => {
    if (slotToDelete) {
      try {
        await deleteSlot(slotToDelete).unwrap();
        toast.success("Slot deleted successfully", { duration: 2000 });
      } catch (err) {
        toast.error("Failed to delete slot", { duration: 2000 });
      } finally {
        setIsDialogOpen(false);
        setSlotToDelete(null);
      }
    }
  };

  // Define the type for the updateData object
  interface UpdateData {
    date?: string;
    startTime?: string;
    endTime?: string;
  }
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData: UpdateData = {};
    if (date) {
      updateData.date = format(parseISO(date), "yyyy-MM-dd");
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    console.log("updateData", updateData);
    try {
      await updateSlot({ id: updateSlotId, updateData: updateData }).unwrap();
      toast.success("Slot updated successfully", { duration: 2000 });

      setShowForm(false);
    } catch (err) {
      const errorMessage =
        (err as any).data?.errorSources?.[0]?.message || "An error occurred";
      toast.error(errorMessage, { duration: 2000 });
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const slotData = {
      room: selectedRoom,
      date,
      startTime,
      endTime,
    };

    console.log(slotData);

    try {
      await createSlot(slotData).unwrap();
      toast.success("Slot created successfully", { duration: 2000 });
      setShowForm(false);
    } catch (err) {
      const errorMessage =
        (err as any).data?.errorSources?.[0]?.message || "An error occurred";
      toast.error(errorMessage, { duration: 2000 });
    }
  };

  return (
    <div className="p-0 md:p-0 w-full">
      <Header
        title="Slot Management"
        add="Create Slot"
        onAddClick={handleAddSlot}
      />

      {showForm && (
        <div>
          <h1 className="text-xl text-center font-medium my-8 text-yellow-500">
            {updateSlotId ? "Update Slot" : "Create Slot"}
          </h1>
          <SlotForm
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            updateSlotId={updateSlotId}
            rooms={rooms}
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            handleUpdateSubmit={handleUpdateSubmit}
          />
        </div>
      )}
      <SlotTable
        slotDatas={slotDatas}
        handleUpdateSlot={handleUpdateSlot}
        handleDeleteSlot={handleDeleteSlot}
      />

      {isLoading && <h1 className="text-center text-red-600">Loading...</h1>}
      <SlotDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        confirmDeleteSlot={confirmDeleteSlot}
      />
    </div>
  );
};

export default SlotManagement;
