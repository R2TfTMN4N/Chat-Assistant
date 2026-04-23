"use client";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { PublicFile } from "@workspace/backend/private/files";
import { useMutation } from "convex/react";

interface DeleteFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: PublicFile | null;
  onDeleted: () => void;
}
export const DeleteFileDialog = ({
  open,
  onOpenChange,
  file,
  onDeleted,
}: DeleteFileDialogProps) => {
  const deleteFile = useMutation(api.private.files.deleteFile);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (!file) return;
    setIsDeleting(true);
    try {
      await deleteFile({ entryId: file.id });
      onDeleted?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
        </DialogHeader>
        {file && (
          <div className="py-4">
            <div className="rounded-lg border bg-muted/50 p-4 ">
              <p className="font-medium">{file.name}</p>
              <p className="text-muted text-sm">
                Type: {file.type.toUpperCase()}|Size: {file.size}
              </p>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            disabled={isDeleting}
            onClick={handleDelete}
            variant="destructive"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
