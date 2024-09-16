import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface RoomDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  confirmDeleteRoom: () => void;
}

const RoomDialog: React.FC<RoomDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  confirmDeleteRoom,
}) => {
  return (
    <div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this room? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className="bg-gray-500 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteRoom}
              className="bg-red-500 text-white"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomDialog;
