"use client";

import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { usePaginatedQuery } from "convex/react";
import {
  Delete,
  FileIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
  FileTextIcon,
  UploadIcon,
  SearchIcon,
  FolderIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { UploadDialog } from "../components/upload-dialog";
import { useState } from "react";
import { DeleteFileDialog } from "../components/delete-file-dialog";
import { PublicFile } from "@workspace/backend/private/files";
export const FilesView = () => {
  const files = usePaginatedQuery(
    api.private.files.list,
    {},
    {
      initialNumItems: 10,
    },
  );
  const {
    topElementRef,
    handleLoadMore,
    canLoadMore,
    isLoadingFirstPage,
    isLoadingMore,
  } = useInfiniteScroll({
    status: files.status,
    loadMore: files.loadMore,
    loadSize: 10,
  });
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteFileDialogOpen, setDeleteFileDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null);
  const handleDeleteClick = (file: PublicFile) => {
    setSelectedFile(file);
    setDeleteFileDialogOpen(true);
  };
  const handleFileDeleted = () => {
    setSelectedFile(null);
  };
  return (
    <>
      <DeleteFileDialog
        open={deleteFileDialogOpen}
        onOpenChange={setDeleteFileDialogOpen}
        file={selectedFile}
        onDeleted={handleFileDeleted}
      />
      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onFileUploaded={() => {}}
      />
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/5 via-background to-muted/20">
        {/* Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
          <div className="relative mx-auto max-w-screen-lg px-6 py-10 md:py-14">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
                <FolderIcon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Knowledge Base
                </h1>
                <p className="text-muted-foreground mt-1">
                  Upload and manage documents for your AI assistants
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto w-full max-w-screen-lg px-6 py-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Documents
                  </CardTitle>
                  <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {files.results.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active files in knowledge base
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Storage Used
                  </CardTitle>
                  <UploadIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {files.results
                      .reduce((acc, file) => {
                        // Extract numeric part of size string (e.g., "12.3 KB"); defaults to 0 when missing/unknown
                        const sizeMatch = (file.size ?? "").match(/([\d.]+)/);
                        const numericSize = sizeMatch?.[1]
                          ? parseFloat(sizeMatch[1])
                          : 0;
                        return (
                          acc + (Number.isNaN(numericSize) ? 0 : numericSize)
                        );
                      }, 0)
                      .toFixed(1)}{" "}
                    KB
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total file size
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Quick Upload
                  </CardTitle>
                  <PlusIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setUploadDialogOpen(true)}
                    className="w-full mt-2"
                    size="sm"
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Card */}
            <Card className="shadow-sm bg-background/80 backdrop-blur-sm">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>
                      Manage your knowledge base files
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setUploadDialogOpen(true)}
                    variant="default"
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="px-6 py-4 font-semibold">
                        Name
                      </TableHead>
                      <TableHead className="px-6 py-4 font-semibold">
                        Type
                      </TableHead>
                      <TableHead className="px-6 py-4 font-semibold">
                        Size
                      </TableHead>
                      <TableHead className="px-6 py-4 font-semibold text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(() => {
                      if (isLoadingFirstPage) {
                        return (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24">
                              Loading files...
                            </TableCell>
                          </TableRow>
                        );
                      }
                      if (files.results.length === 0) {
                        return (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No files found
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return files.results.map((file) => (
                        <TableRow
                          className="hover:bg-muted/50 transition-colors"
                          key={file.id}
                        >
                          <TableCell className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <FileTextIcon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{file.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  Document
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge
                              className="uppercase font-medium"
                              variant="secondary"
                            >
                              {file.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="px-6 py-4 text-muted-foreground font-medium">
                            {file.size}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  className="h-8 w-8 p-0"
                                  size="sm"
                                  variant="ghost"
                                >
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive cursor-pointer"
                                  onClick={() => handleDeleteClick(file)}
                                >
                                  <TrashIcon className="h-4 w-4 mr-2" />
                                  Delete File
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ));
                    })()}
                  </TableBody>
                </Table>
                {!isLoadingFirstPage && files.results.length > 0 && (
                  <div className="border-t">
                    <InfiniteScrollTrigger
                      canLoadMore={canLoadMore}
                      isLoadingMore={isLoadingMore}
                      onLoadMore={handleLoadMore}
                      ref={topElementRef}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
