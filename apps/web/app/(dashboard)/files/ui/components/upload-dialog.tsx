"use client";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@workspace/ui/components/dropzone";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useAction } from "convex/react";
import { useState } from "react";
interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUploaded: () => void;
}
export const UploadDialog = ({
  open,
  onOpenChange,
  onFileUploaded,
}: UploadDialogProps) => {
  const addFile = useAction(api.private.files.addFile);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    category: "",
    filename: "",
  });
  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFiles([file]);
      if (!uploadForm.filename) {
        setUploadForm((prev) => ({ ...prev, filename: file.name }));
      }
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      const blob = uploadedFiles?.[0];
      if (!blob) {
        throw new Error("No file selected for upload");
      }
      const fileName = uploadForm.filename || blob.name;
      await addFile({
        bytes: await blob.arrayBuffer(),
        fileName,
        mimeType: blob.type,
        category: uploadForm.category,
      });
      onFileUploaded?.();
      handleCancel();
    } catch (error) {
      console.error("File upload failed", error);
    }
  };
  const handleCancel = () => {
    onOpenChange(false);
    setUploadedFiles([]);
    setUploadForm({ category: "", filename: "" });
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a document to your AI KnowledgeBase.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              className="w-full"
              id="category"
              onChange={(e) =>
                setUploadForm((prev) => ({ ...prev, category: e.target.value }))
              }
              placeholder="e.g. Finance, HR, Legal"
              type="text"
              value={uploadForm.category}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filename">
              Filename{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              className="w-full"
              id="filename"
              onChange={(e) =>
                setUploadForm((prev) => ({ ...prev, filename: e.target.value }))
              }
              placeholder="Document filename"
              type="text"
              value={uploadForm.filename}
            />
          </div>
          <Dropzone
            accept={{
              "application/pdf": [".pdf"],
              "text/plain": [".txt"],
              "text/csv": [".csv"],
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
              "application/msword": [".doc"],
            }}
            disabled={isUploading}
            maxFiles={1}
            src={uploadedFiles}
            onDrop={handleFileDrop}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </div>
        <DialogFooter>
          <Button
            disabled={isUploading || !uploadedFiles}
            onClick={handleCancel}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            disabled={
              !uploadedFiles ||
              uploadedFiles.length === 0 ||
              isUploading ||
              !uploadForm.category
            }
            onClick={handleUpload}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
